'use strict';

module.exports = function (object, products) {
    Object.defineProperty(object, 'recommendedProducts', {
        enumerable: true,
        value: {
            collection: products
        }
    });
};
