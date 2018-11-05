export default {

  inputLabel (jsonKey) {
    if (typeof jsonKey === 'string') {
      return jsonKey.replace(/_/g, ' ')
        .replace('multi', '')
        .replace('Multi', '')
        .replace('checkbox', '')
        .replace('Checkbox', '')
    }
  }

}
