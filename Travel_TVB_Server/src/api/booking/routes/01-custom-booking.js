module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/bookings/create-payment-url',
      handler: 'booking.createPaymentUrl',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/bookings/vnpay-return',
      handler: 'booking.vnpayReturn',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/bookings/my-bookings',
      handler: 'booking.myBookings',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
