export default {

  inputLabel(json_key)
  {
      if (typeof json_key === 'string') {
          return json_key.replace(/_/g, ' ')
                         .replace('multi', '')
                         .replace('Multi', '')
                         .replace('checkbox', '')
                         .replace('Checkbox', '')
      }
  },

}
