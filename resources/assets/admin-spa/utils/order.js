import { operators } from 'utils/operators';
import priceUtil from 'utils/price';

var forEach = require('lodash.foreach');

export default {

    productSubTotal(product)
    {
        return priceUtil.normalise(product.price) * parseInt(product.quantity);
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
        return priceUtil.normalise(this.productExtras(product)) + priceUtil.normalise(this.productSubTotal(product));
    },

    totals(products, shipping = 0, discount = 0)
    {
        var sub_total = 0;
        var extras = 0;
        forEach(products, function(product, key) {
            var quantity = product.quantity ? product.quantity : 1;
            sub_total = sub_total + (priceUtil.normalise(product.price) * parseInt(quantity));

            forEach((product.options ? product.options : []), function(option) {
                if (option) {
                    if (option.price_mutator && option.price_value) {
                        extras = extras + (operators[option.price_mutator](0, option.price_value) * parseInt(quantity));
                    }
                }
            });
        });

        var total_ex_vat = (priceUtil.normalise(sub_total) + priceUtil.normalise(extras) + priceUtil.normalise(shipping));
        var discount_amount = total_ex_vat * (parseInt(discount) / 100);
        total_ex_vat = (total_ex_vat - discount_amount);
        var vat = total_ex_vat * 0.2;
        var total = total_ex_vat + vat;
        return [
            {
                total: 'Sub-Total',
                value: priceUtil.normalise(sub_total)
            },
            {
                total: 'Extras',
                value: priceUtil.normalise(extras)
            },
            {
                total: 'Shipping',
                value: priceUtil.normalise(shipping)
            },
            {
                total: 'Discount',
                value: discount
            },
            {
                total: 'VAT',
                value: priceUtil.normalise(vat)
            },
            {
                total: 'Total',
                value: priceUtil.normalise(total)
            },
        ]
    },
}
