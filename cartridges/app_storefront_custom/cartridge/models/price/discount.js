/**
 * @constructor
 * @classdesc Default price class
 * @param {dw.value.Money} salesPrice - Sales price
 * @param {dw.value.Money} listPrice - List price
 */


function toPriceDiscount(salesPrice, listPrice) {
    var percent = (salesPrice.value - listPrice.value) / listPrice.value * (-100);
    if (percent) { percentResult = percent.toFixed(0); }
    return {
        discount: percentResult
    }
}

function discountPrice(salesPrice, listPrice) {
    this.discount = listPrice ? toPriceDiscount(salesPrice, listPrice) : null;
}

module.exports = discountPrice;