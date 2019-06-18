import { startLoading, endLoading } from "util/loading";

export function hideTableHeader(columns, propOrPropArr, isHidden) {
  startLoading();
  if (Array.isArray(propOrPropArr)) {
    propOrPropArr.forEach(prop => {
      let column = columns.find(
        column => (column && column.attrs && column.attrs.prop) === prop
      );
      column && (column.hidden = isHidden);
    });
  } else {
    let column = columns.find(
      column => (column && column.attrs && column.attrs.prop) === propOrPropArr
    );
    column && (column.hidden = isHidden);
  }
  endLoading();
  return columns;
}
