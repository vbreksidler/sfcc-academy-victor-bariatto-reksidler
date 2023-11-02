'use strict';

module.exports = function (object, ID) {
    Object.defineProperty(object, 'categoryID', {
        enumerable: true,
        value: {
            ID
        }
    });
};
