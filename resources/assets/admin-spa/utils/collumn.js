import button from './button.js'
var forEach = require('lodash.foreach');

export default {

    /**
     * Render the collumns
     *
     * @param Array collumns
     * @return Array
     */
    render(collumns = [])
    {
        var renderedCols = [];
        forEach(collumns, col => {
            col.formatter = function() { return button.render(col)};
            renderedCols.push(col);

            // var path = col.action.path.replace("${id}","1");
            // console.log(path);
        });
        return renderedCols;
    },

    selectCollumnType(collumn)
    {
        if (collumn.type === 'button') {
            return button.render(collumn);
        }
    }

}
