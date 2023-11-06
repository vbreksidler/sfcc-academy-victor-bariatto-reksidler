'use strict';

var server = require('server');
var confirmSubscriptionTracking = require('*/cartridge/scripts/middleware/confirmSubscriptionTracking');

server.get('SetSession', function (req, res, next) {
    var confirmSubscription = (req.querystring.confirmSubscription === 'true');
    req.session.raw.setTrackingAllowed(confirmSubscription);
    req.session.privacyCache.set('confirmSubscription', confirmSubscription);
    res.json({ success: true });
    next();
});

server.get('GetContent', function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var ContentModel = require('*/cartridge/models/content');

    var apiContent = ContentMgr.getContent(req.querystring.cid);

    if (apiContent) {
        var content = new ContentModel(apiContent, 'components/content/contentAssetInc');
        if (content.template) {
            res.render(content.template, { content: content });
        }
    }
    next();
});

server.get('Check', confirmSubscriptionTracking.confirmSubscription, function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('tracking_hint');
    res.render('/newsletter/confirmSubscription', {
        confirmSubscriptionApi: Object.prototype.hasOwnProperty.call(req.session.raw, 'setTrackingAllowed'),
        caOnline: content.online
    });
    next();
});

module.exports = server.exports();
