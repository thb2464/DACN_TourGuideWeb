'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const crypto = require('crypto');
const qs = require('qs');
const { sortObject, formatVnpDate } = require('../utils/vnpay-helpers');

module.exports = createCoreController('api::booking.booking', ({ strapi }) => ({

  // Override create: concurrency-safe booking with capacity check
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in to book a tour.');
    }

    const { tour: tourId, adult_count, child_count = 0, travel_date, contact_name, contact_email, contact_phone } = ctx.request.body.data || {};

    if (!tourId || !adult_count || !travel_date || !contact_name || !contact_email || !contact_phone) {
      return ctx.badRequest('Missing required booking fields.');
    }

    const knex = strapi.db.connection;

    try {
      const result = await knex.transaction(async (trx) => {
        // Fetch tour — Strapi 5 uses snake_case column names
        const tour = await trx('tours').where('id', tourId).first();
        if (!tour) {
          throw new Error('TOUR_NOT_FOUND');
        }

        const maxParticipants = tour.max_participants || 999;
        const adultPrice = parseInt(tour.price) || 0;
        const childPrice = parseInt(tour.child_price) || adultPrice;

        // Count currently booked participants for this tour + date
        // Strapi 5 stores relations in a separate link table
        const bookedResult = await trx('bookings')
          .join('bookings_tour_lnk', 'bookings.id', 'bookings_tour_lnk.booking_id')
          .where('bookings_tour_lnk.tour_id', tourId)
          .where('bookings.travel_date', travel_date)
          .whereIn('bookings.status', ['Pending', 'Paid'])
          .select(trx.raw('COALESCE(SUM(bookings.adult_count + bookings.child_count), 0) as booked_count'))
          .first();

        const bookedCount = parseInt(bookedResult?.booked_count) || 0;
        const requested = parseInt(adult_count) + parseInt(child_count);
        const remaining = maxParticipants - bookedCount;

        if (requested > remaining) {
          throw new Error('CAPACITY_EXCEEDED');
        }

        // Calculate total price
        const totalPrice = (parseInt(adult_count) * adultPrice) + (parseInt(child_count) * childPrice);
        const paymentRef = `BOOK_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        const now = new Date().toISOString();

        // Insert booking
        const [bookingId] = await trx('bookings').insert({
          document_id: crypto.randomUUID(),
          adult_count: parseInt(adult_count),
          child_count: parseInt(child_count),
          travel_date,
          total_price: totalPrice.toString(),
          status: 'Pending',
          payment_ref: paymentRef,
          booking_date: now,
          contact_name,
          contact_email,
          contact_phone,
          created_at: now,
          updated_at: now,
          published_at: now,
          locale: null,
        });

        // Insert relation links
        await trx('bookings_tour_lnk').insert({
          booking_id: bookingId,
          tour_id: tourId,
        });

        await trx('bookings_user_lnk').insert({
          booking_id: bookingId,
          user_id: user.id,
        });

        return {
          id: bookingId,
          total_price: totalPrice.toString(),
          payment_ref: paymentRef,
          status: 'Pending',
          remaining: remaining - requested,
        };
      });

      ctx.body = { data: result };
    } catch (err) {
      if (err.message === 'TOUR_NOT_FOUND') {
        return ctx.notFound('Tour not found.');
      }
      if (err.message === 'CAPACITY_EXCEEDED') {
        return ctx.badRequest('Not enough spots available for this tour on the selected date.');
      }
      strapi.log.error('Booking creation failed:', err);
      return ctx.internalServerError('Booking creation failed.');
    }
  },

  // Generate VNPay payment URL
  async createPaymentUrl(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in.');
    }

    const { bookingId } = ctx.request.body || {};
    if (!bookingId) {
      return ctx.badRequest('Missing bookingId.');
    }

    const knex = strapi.db.connection;

    // Verify booking exists and belongs to user
    const booking = await knex('bookings')
      .join('bookings_user_lnk', 'bookings.id', 'bookings_user_lnk.booking_id')
      .where('bookings.id', bookingId)
      .where('bookings_user_lnk.user_id', user.id)
      .select('bookings.*')
      .first();

    if (!booking) {
      return ctx.notFound('Booking not found.');
    }
    if (booking.status !== 'Pending') {
      return ctx.badRequest('Booking is not in Pending status.');
    }

    const tmnCode = process.env.VNPAY_TMN_CODE;
    const secretKey = process.env.VNPAY_HASH_SECRET;
    const vnpUrl = process.env.VNPAY_URL;
    const returnUrl = process.env.VNPAY_RETURN_URL;

    const txnRef = `${booking.id}_${Date.now()}`;
    const amount = parseInt(booking.total_price) * 100; // VNPay requires amount x 100
    const orderInfo = `Thanh toan dat tour ${booking.id}`;

    const ipAddr = ctx.request.ip || ctx.request.headers['x-forwarded-for'] || '127.0.0.1';

    // All values must be strings for consistent encoding
    let vnpParams = {};
    vnpParams['vnp_Version'] = '2.1.0';
    vnpParams['vnp_Command'] = 'pay';
    vnpParams['vnp_TmnCode'] = tmnCode;
    vnpParams['vnp_Locale'] = 'vn';
    vnpParams['vnp_CurrCode'] = 'VND';
    vnpParams['vnp_TxnRef'] = txnRef;
    vnpParams['vnp_OrderInfo'] = orderInfo;
    vnpParams['vnp_OrderType'] = 'other';
    vnpParams['vnp_Amount'] = amount;
    vnpParams['vnp_ReturnUrl'] = returnUrl;
    vnpParams['vnp_IpAddr'] = '127.0.0.1';
    vnpParams['vnp_CreateDate'] = formatVnpDate(new Date());

    // Update booking with txnRef
    await knex('bookings').where('id', bookingId).update({
      payment_ref: txnRef,
      updated_at: new Date().toISOString(),
    });

    // Sort and sign — VNPay official sortObject + qs.stringify encode:false
    vnpParams = sortObject(vnpParams);
    const signData = qs.stringify(vnpParams, { encode: false });

    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnpParams['vnp_SecureHash'] = signed;
    const paymentUrl = `${vnpUrl}?${qs.stringify(vnpParams, { encode: false })}`;

    strapi.log.info('VNPAY signData: ' + signData);
    strapi.log.info('VNPAY secretKey: ' + JSON.stringify(secretKey));
    strapi.log.info('VNPAY hash: ' + signed);

    ctx.body = { paymentUrl };
  },

  // Handle VNPay return callback
  async vnpayReturn(ctx) {
    const vnpParams = { ...ctx.query };
    const secureHash = vnpParams.vnp_SecureHash;

    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    const secretKey = process.env.VNPAY_HASH_SECRET;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    // Sort and verify — same approach as signing: qs.stringify encode: false
    const sorted = sortObject(vnpParams);
    const signData = qs.stringify(sorted, { encode: false });

    const hmac = crypto.createHmac('sha512', secretKey);
    const checksum = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    const knex = strapi.db.connection;
    const txnRef = vnpParams.vnp_TxnRef;
    const bookingId = txnRef ? txnRef.split('_')[0] : null;

    if (secureHash !== checksum) {
      if (bookingId) {
        await knex('bookings').where('id', bookingId).update({
          status: 'Failed',
          updated_at: new Date().toISOString(),
        });
      }
      return ctx.redirect(`${frontendUrl}/payment-return?status=failed&bookingId=${bookingId || ''}&reason=invalid_checksum`);
    }

    const responseCode = vnpParams.vnp_ResponseCode;
    const transactionNo = vnpParams.vnp_TransactionNo || '';

    if (responseCode === '00') {
      if (bookingId) {
        await knex('bookings').where('id', bookingId).update({
          status: 'Paid',
          vnpay_transaction_no: transactionNo,
          updated_at: new Date().toISOString(),
        });
      }
      return ctx.redirect(`${frontendUrl}/payment-return?status=success&bookingId=${bookingId}`);
    } else {
      if (bookingId) {
        await knex('bookings').where('id', bookingId).update({
          status: 'Failed',
          vnpay_transaction_no: transactionNo,
          updated_at: new Date().toISOString(),
        });
      }
      return ctx.redirect(`${frontendUrl}/payment-return?status=failed&bookingId=${bookingId}&reason=vnpay_${responseCode}`);
    }
  },

  // Get authenticated user's bookings
  async myBookings(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in.');
    }

    const knex = strapi.db.connection;

    const bookings = await knex('bookings')
      .join('bookings_user_lnk', 'bookings.id', 'bookings_user_lnk.booking_id')
      .where('bookings_user_lnk.user_id', user.id)
      .orderBy('bookings.booking_date', 'desc')
      .select('bookings.*');

    // Fetch tour names
    const bookingIds = bookings.map(b => b.id);
    const tourLinks = bookingIds.length > 0
      ? await knex('bookings_tour_lnk').whereIn('booking_id', bookingIds).select('*')
      : [];

    const tourIds = [...new Set(tourLinks.map(l => l.tour_id).filter(Boolean))];
    const tours = tourIds.length > 0
      ? await knex('tours').whereIn('id', tourIds).select('id', 'tour_name', 'slug')
      : [];

    const tourMap = {};
    tours.forEach(t => { tourMap[t.id] = t; });

    const linkMap = {};
    tourLinks.forEach(l => { linkMap[l.booking_id] = l.tour_id; });

    const enrichedBookings = bookings.map(b => {
      const tourId = linkMap[b.id];
      const tour = tourId ? tourMap[tourId] : null;
      return {
        id: b.id,
        adult_count: b.adult_count,
        child_count: b.child_count,
        travel_date: b.travel_date,
        total_price: b.total_price,
        status: b.status,
        payment_ref: b.payment_ref,
        booking_date: b.booking_date,
        contact_name: b.contact_name,
        tour_name: tour?.tour_name || 'Unknown Tour',
        tour_slug: tour?.slug || '',
      };
    });

    ctx.body = { data: enrichedBookings };
  },
}));
