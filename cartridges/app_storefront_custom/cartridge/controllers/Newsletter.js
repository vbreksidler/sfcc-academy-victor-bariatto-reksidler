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
            var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers')
            var fromEmail = dw.system.Site.getCurrent().getPreferences().custom.customerServiceEmail;
            // var Coupon = require('dw/campaign/Coupon');
            // var Promotion = require('dw/campaign/Promotion');
            // var Campaign = require('dw/campaign/Campaign');
            // var Transaction = require('dw/system/Transaction');
            // Transaction.wrap(function(){
            // })
            //learn abou Transaction
            
            var objectForEmail = {
                firstName: myForm.newsletterFirstName,
                lastName: myForm.newsletterLastName,
            };

            var emailObj = {
                to: myForm.newsletterEmail,
                subject: Resource.msg('subject.confimation.email', 'newsletter', null),
                from: fromEmail,
                type: emailHelpers.emailTypes.newsletter
            };
            emailHelpers.sendEmail(emailObj, '/mail/newsletter', objectForEmail);

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
