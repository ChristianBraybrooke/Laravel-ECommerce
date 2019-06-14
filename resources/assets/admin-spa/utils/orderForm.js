export default {
  formatFieldValue (section, field) {
    return {
      value: null,
      name: null,
      group: section.name,
      type: field.type,
      appends: field.appends ? field.appends : '',
      prepends: field.prepends ? field.appends : '',
      label: field.name
    }
  }
}
