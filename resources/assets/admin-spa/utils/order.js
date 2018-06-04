import { operators } from './operators';

var forEach = require('lodash.foreach');

export default {

    productSubTotal(product)
    {
        return parseFloat(product.price) * parseInt(product.quantity);
    },

    productExtras(product)
    {
        var extras = 0;
        if (product.options) {
            forEach(product.options, function(option) {
                if (option) {
                    if (option.price_mutator && option.price_value) {
                        extras = operators[option.price_mutator](extras, option.price_value);
                    }
                }
            });
        }
        return extras;
    },

    productTotal(product)
    {
        return parseFloat(this.productExtras(product)) + parseFloat(this.productSubTotal(product));
    },

    totals(products, shipping = 0)
    {
        var sub_total = 0;
        var extras = 0;
        forEach(products, function(product, key) {
            var quantity = product.quantity ? product.quantity : 1;
            sub_total = sub_total + (parseFloat(product.price) * parseInt(quantity));

            forEach((product.options ? product.options : []), function(option) {
                if (option) {
                    if (option.price_mutator && option.price_value) {
                        extras = extras + (operators[option.price_mutator](0, option.price_value) * parseInt(quantity));
                    }
                }
            });
        });

        var vat = (parseFloat(sub_total) + parseFloat(extras) + parseFloat(shipping)) * 0.2;
        return [
            {
                total: 'Sub-Total',
                value: parseFloat(sub_total)
            },
            {
                total: 'Extras',
                value: parseFloat(extras)
            },
            {
                total: 'Shipping',
                value: parseFloat(shipping)
            },
            {
                total: 'VAT',
                value: parseFloat(vat)
            },
            {
                total: 'Total',
                value: parseFloat(sub_total) + parseFloat(extras) + parseFloat(shipping) + parseFloat(vat)
            },
        ]
    },
}
