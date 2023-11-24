'use strict';

var server = require('server');

server.get('Landing', server.middleware.https, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');

    res.render('newsletter/newsletter.isml', {
        actionUrl: URLUtils.url('Newsletter-Subscribe').toString()
    });

    next();
});

server.post('Subscribe', server.middleware.https, function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var hooksHelper = require('*/cartridge/scripts/helpers/hooks');
    var emailHelper = require('*/cartridge/scripts/helpers/emailHelpers');

    var myForm = req.form;
    var isValidEmailid = emailHelper.validateEmail(myForm.newsletterEmail);
    if (isValidEmailid) {
        var newsletterDetails = [myForm.newsletterFirstName, myForm.newsletterLastName, myForm.newsletterEmail];
        hooksHelper('app.newsletter.subscribe', 'subscribe', newsletterDetails, function () { });

        server.append('Subscribe', function (req, res, next) {
            var CouponMgr = require('dw/campaign/CouponMgr');
            var fromEmail = dw.system.Site.getCurrent().getPreferences().custom.customerServiceEmail;
            var CustomObjectMgr = require('dw/object/CustomObjectMgr');
            var Transaction = require('dw/system/Transaction');

            Transaction.wrap(function () {
                if (CustomObjectMgr.getCustomObject("NewsletterSubscription", myForm.newsletterEmail)) {
                    throw new Error('Sorry, this e-mail is already registred for Newsletter');
                }
                CustomObjectMgr.createCustomObject("NewsletterSubscription", myForm.newsletterEmail);
                var coupons = CouponMgr.getCoupons();
                var couponCode = coupons[0].nextCouponCode;
    
                var objectForEmail = {
                    firstName: myForm.newsletterFirstName,
                    lastName: myForm.newsletterLastName,
                    couponCode,
                };

                if (couponCode === null) {
                    var emailObj = {
                        to: myForm.newsletterEmail,
                        subject: Resource.msg('subject.confimation.email', 'newsletter', null),
                        from: fromEmail,
                        type: emailHelper.emailTypes.newsletter
                    };
                    emailHelper.sendEmail(emailObj, '/mail/newsletterError', objectForEmail);
                } else {
                    var emailObj = {
                        to: myForm.newsletterEmail,
                        subject: Resource.msg('subject.confimation.email', 'newsletter', null),
                        from: fromEmail,
                        type: emailHelper.emailTypes.newsletter
                    };
                    emailHelper.sendEmail(emailObj, '/mail/newsletter', objectForEmail);
                    }
                })
                
            next();
        })
        res.json({
            success: true,
            msg: Resource.msg('subscribe.to.newsletter.success', 'newsletter', null)
        });
    } else {
        res.json({
            error: true,
            msg: Resource.msg('subscribe.to.newsletter.email.invalid', 'newsletter', null)
        });
    }

    next();
});

module.exports = server.exports();
