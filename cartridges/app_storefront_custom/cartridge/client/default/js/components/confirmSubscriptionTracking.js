'use strict';

function showConfirmSubscriptionModal() {
    if (!$('.tracking-confirmSubscription').data('caonline')) {
        return;
    }

    var urlContent = $('.tracking-confirmSubscription').data('url');
    var urlAccept = $('.tracking-confirmSubscription').data('accept');
    var urlReject = $('.tracking-confirmSubscription').data('reject');
    var textYes = $('.tracking-confirmSubscription').data('accepttext');
    var textNo = $('.tracking-confirmSubscription').data('rejecttext');
    var textHeader = $('.tracking-confirmSubscription').data('heading');

    var htmlString = '<!-- Modal -->'
        + '<div class="modal show" id="confirmSubscription-tracking" role="dialog" style="display: block;">'
        + '<div class="modal-dialog">'
        + '<!-- Modal content-->'
        + '<div class="modal-content">'
        + '<div class="modal-header">'
        + textHeader
        + '</div>'
        + '<div class="modal-body"></div>'
        + '<div class="modal-footer">'
        + '<div class="button-wrapper">'
        + '<button class="affirm btn btn-primary" data-url="' + urlAccept + '">'
        + textYes
        + '</button>'
        + '<button class="decline btn btn-primary" data-url="' + urlReject + '">'
        + textNo
        + '</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    $.spinner().start();
    $('body').append(htmlString);

    $.ajax({
        url: urlContent,
        type: 'get',
        dataType: 'html',
        success: function (response) {
            $('.modal-body').html(response);
        },
        error: function () {
            $('#confirmSubscription-tracking').remove();
        }
    });

    $('#confirmSubscription-tracking .button-wrapper button').click(function (e) {
        e.preventDefault();
        var url = $(this).data('url');
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            success: function () {
                $('#confirmSubscription-tracking').remove();
                $.spinner().stop();
            },
            error: function () {
                $('#confirmSubscription-tracking').remove();
                $.spinner().stop();
            }
        });
    });
}

module.exports = function () {
    if ($('.confirmedSubscription') === 0 && $('.tracking-confirmSubscription').hasClass('api-true')) {
        showConfirmSubscriptionModal();
    }

    if ($('.tracking-confirmSubscription').hasClass('api-true')) {
        $('.tracking-confirmSubscription').click(function () {
            showConfirmSubscriptionModal();
        });
    }
};
