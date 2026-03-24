'use strict';

// Custom core routes — avoid :id catching our custom paths
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/bookings',
      handler: 'booking.find',
      config: {},
    },
    {
      method: 'POST',
      path: '/bookings',
      handler: 'booking.create',
      config: {},
    },
    {
      method: 'GET',
      path: '/bookings/:id',
      handler: 'booking.findOne',
      config: {},
    },
    {
      method: 'PUT',
      path: '/bookings/:id',
      handler: 'booking.update',
      config: {},
    },
    {
      method: 'DELETE',
      path: '/bookings/:id',
      handler: 'booking.delete',
      config: {},
    },
  ],
};
