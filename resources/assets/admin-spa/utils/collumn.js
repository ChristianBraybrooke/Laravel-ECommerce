var findIndex = require('lodash.findindex')
var has = require('lodash.has')
var forEach = require('lodash.foreach')

export default {

  /**
     * Replace the parts of the path that need to be subsituted for real data.
     *
     * @return String
     */
  replaceVariables (path, row) {
    path = path.replace(/\${(.+?)\}/g, (x) => {
      x = x.replace('${', '')
      x = x.replace('}', '')
      return this.dotToObjectPath(x, row)
    })
    return path
  },

  /**
     * Replace a lookup for index in a dot syntax string.
     *
     * @return String
     */
  replaceWhereLookup (set, object) {
    if (set) {
      var string = set.replace(/\$\[(.+?)\]/g, (x) => {
        x = x.replace('$[', '')
        x = x.replace(']', '')

        var beforeEquals = x.split('=')[0]
        var afterEquals = x.split('=')[1]
        var lookup = set.split('.$[')[0]
        lookup = this.dotToObjectPath(lookup, object)

        return findIndex(lookup, function (o) { return o[beforeEquals] === afterEquals })
      })
      if (has(object, string)) {
        return string
      }
      return null
    }
    return null
  },

  /**
     * Turn a dot syntax string into an object path.
     *
     * @return Mixed
     */
  dotToObjectPath (string, object) {
    return string ? string.split('.').reduce((o, i) => has(o, i) ? o[i] : null, object) : null
  },

  /**
     * Set a dynamic row value.
     *
     * @return Mixed
     */
  setRowValue (obj, is, value) {
    if (typeof is === 'string') {
      var rowVal = this.setRowValue(obj, is.split('.'), value)
      return rowVal
    } else if (is.length === 1 && value !== undefined) {
      obj[is[0]] = value
      return obj
    } else if (is.length === 0) {
      return obj
    } else {
      return this.setRowValue(obj[is[0]], is.slice(1), value)
    }
  },

  getRowColour (colourRules, row) {
    var rowColour = ''
    colourRules.forEach((rule) => {
      var ifPath = this.replaceWhereLookup(rule.if, row)
      var ifValue = this.dotToObjectPath(ifPath, row)

      switch (rule.value) {
        case '*':
          if (ifValue !== null && ifValue !== '' && ifValue !== 0) {
            rowColour = rule.colour
          }
          break
        default:
          if (ifValue === rule.value) {
            rowColour = rule.colour
          }
      }
    })
    return rowColour
  },

  getColColour (additonalCols, collumn, row) {
    var colour = null
    forEach(additonalCols, (col) => {
      if (col.prop === collumn.property && (col.col_background || col.empty_background || col.filled_background)) {
        var dots = this.replaceWhereLookup(col.value, row)
        var value = this.dotToObjectPath(dots, row)

        if (col.col_background) {
          colour = col.col_background
        } else if (value === null || value === '' || value === 0) {
          colour = col.empty_background
        } else if (value && col.filled_background) {
          colour = col.filled_background
        }
      }
    })
    return colour
  }

}
