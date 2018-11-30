import { operators } from 'utils/operators'
import priceUtil from 'utils/price'

var forEach = require('lodash.foreach')
var vatIncluded = window.ecommerceConfig.vat_included
var vatAmount = window.ecommerceConfig.vat_amount

export default {

  productSubTotal (product) {
    return priceUtil.normalise(product.price) * parseInt(product.quantity)
  },

  productExtras (product) {
    var extras = 0
    if (product.options) {
      forEach(product.options, function (option) {
        if (option) {
          if (option.price_mutator && option.price_value) {
            extras = operators[option.price_mutator](extras, option.price_value)
          }
        }
      })
    }
    return extras * product.quantity
  },

  productTotal (product) {
    return priceUtil.normalise(this.productExtras(product)) + priceUtil.normalise(this.productSubTotal(product))
  },

  paymentTotal (payments) {
    var total = 0
    payments.forEach((payment) => {
      if (payment.refunded !== true) {
        var amount = String(payment.amount)
        amount = parseFloat(amount.replace(/,/g, ''))
        total = total + amount
      }
    })
    return total
  },

  totals (products, shipping = 0, discount = 0) {
    var subTotal = 0
    var extras = 0
    forEach(products, function (product, key) {
      var quantity = product.quantity ? product.quantity : 1
      subTotal = subTotal + (priceUtil.normalise(product.price) * parseInt(quantity))

      forEach((product.options ? product.options : []), function (option) {
        if (option) {
          if (option.price_mutator && option.price_value) {
            extras = extras + (operators[option.price_mutator](0, option.price_value) * parseInt(quantity))
          }
        }
      })
    })

    var totalExVat = (priceUtil.normalise(subTotal) + priceUtil.normalise(extras) + priceUtil.normalise(shipping))
    var discountAmount = totalExVat * (parseInt(discount) / 100)
    totalExVat = (totalExVat - discountAmount)
    var vat = vatIncluded ? (totalExVat / (vatAmount + 1)) * vatAmount : totalExVat * vatAmount
    var total = vatIncluded ? (totalExVat) : (totalExVat + vat)

    return [
      {
        total: 'Sub-Total',
        value: priceUtil.normalise(subTotal)
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
        total: `VAT ${vatIncluded ? '(included)' : ''}`,
        value: priceUtil.normalise(vat)
      },
      {
        total: 'Total',
        value: priceUtil.normalise(total)
      }
    ]
  },

  getStatusNameFromCode (statusCode) {
    const { statuses } = window.ecommerceConfig.orders
    var name = null

    forEach(statuses, (status, key) => {
      if (key === statusCode) {
        name = status
      }
    })

    return name
  }
}
