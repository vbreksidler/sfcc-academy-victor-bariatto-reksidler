'use strict';

/**
 * Middleware to use confirmSubscription tracking check
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function confirmSubscription(req, res, next) {
    var confirmedSubscription = req.session.privacyCache.get('confirmSubscription');
    if (confirmedSubscription === null || confirmedSubscription === undefined) {
        req.session.privacyCache.set('confirmSubscription', null);
    } else if (confirmedSubscription === false) {
        req.session.privacyCache.set('confirmSubscription', false);
        req.session.raw.setTrackingAllowed(false);
    } else if (confirmedSubscription === true) {
        req.session.privacyCache.set('confirmSubscription', true);
        req.session.raw.setTrackingAllowed(true);
    }

    res.setViewData({
        tracking_confirmSubscription: req.session.privacyCache.get('confirmSubscription')
    });
    next();
}

module.exports = {
    confirmSubscription: confirmSubscription
};
