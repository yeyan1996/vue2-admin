export function hideTableHeader(columns, propOrPropArr, isHidden) {
  if (Array.isArray(propOrPropArr)) {
    propOrPropArr.forEach(prop => {
      let column = columns.find(column => column.attrs.prop === prop);
      column && (column.hidden = isHidden);
    });
  } else {
    let column = columns.find(column => column.attrs.prop === propOrPropArr);
    column && (column.hidden = isHidden);
  }
  return columns;
}
//# sourceMappingURL=hideTableHeader.js.map
