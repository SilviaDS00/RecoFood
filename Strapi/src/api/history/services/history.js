'use strict';

/**
 * history service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::history.history');
