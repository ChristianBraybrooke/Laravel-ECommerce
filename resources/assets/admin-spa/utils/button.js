export default {

    /**
     * Render the button
     *
     * @param Object collumn
     * @return JSX
     */
    render(collumn = {})
    {
        var button = collumn.button ? collumn.button : {};
        var renderedButton = <el-button type={button.type ? button.type : 'primary'}
                                        plain={button.plain === true ? true : false}
                                        size={button.size ? button.size : 'small'}
                                        on-click={ () => this }>
                                        { button.text ? button.text : 'Confirm' }
                              </el-button>
        return renderedButton;
    },
}
