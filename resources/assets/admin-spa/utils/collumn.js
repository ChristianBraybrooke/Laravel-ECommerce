var findIndex = require('lodash.findindex');
var has = require('lodash.has');

export default {

    /**
     * Replace the parts of the path that need to be subsituted for real data.
     *
     * @return String
     */
    replaceVariables(path, row)
    {
        path = path.replace(/\${(.+?)\}/g, (x) => {
            x = x.replace('${', '');
            x = x.replace('}', '');
            return this.dotToObjectPath(x, row);
        });
        return path;
    },

    /**
     * Replace a lookup for index in a dot syntax string.
     *
     * @return String
     */
    replaceWhereLookup(set, object)
    {
        if (set) {
            var string = set.replace(/\$\[(.+?)\]/g, (x) => {
                x = x.replace('$[', '');
                x = x.replace(']', '');

                var before_equals = x.split('=')[0];
                var after_equals = x.split('=')[1];
                var lookup = set.split('.$[')[0];
                lookup = this.dotToObjectPath(lookup, object);

                return findIndex(lookup, function (o) { return o[before_equals] === after_equals });
            });
            if (has(object, string)) {
                return string
            }
            return null;
        }
        return null;
    },

    /**
     * Turn a dot syntax string into an object path.
     *
     * @return Mixed
     */
    dotToObjectPath(string, object)
    {
        return string ? string.split('.').reduce((o,i) => has(o, i) ? o[i] : null, object) : null;
    },

    /**
     * Set a dynamic row value.
     *
     * @return Mixed
     */
    setRowValue(obj,is, value)
    {
        if (typeof is == 'string')
            return this.setRowValue(obj,is.split('.'), value);
        else if (is.length==1 && value!==undefined)
            return obj[is[0]] = value;
        else if (is.length==0)
            return obj;
        else
            return this.setRowValue(obj[is[0]],is.slice(1), value);
    },

    getRowColour(colour_rules, row)
    {
        var row_colour = '';
        colour_rules.forEach((rule) => {

            var if_path = this.replaceWhereLookup(rule.if, row);
            var if_value = this.dotToObjectPath(if_path, row);

            switch (rule.value) {
              case '*':
                if (if_value !== null && if_value !== '') {
                    row_colour = rule.colour
                }
                break;

            }

        });
        return row_colour;
    }

}
