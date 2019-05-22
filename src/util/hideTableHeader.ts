import { Column } from "@/interface/Columns";

export function hideTableHeader(
  columns: Column[],
  propOrPropArr: string | string[],
  isHidden: boolean
): Column[] {
  if (Array.isArray(propOrPropArr)) {
    propOrPropArr.forEach(prop => {
      let column: Column | undefined = columns.find(
        column => (column && column.attrs && column.attrs.prop) === prop
      );
      column && (column.hidden = isHidden);
    });
  } else {
    let column: Column | undefined = columns.find(
      column => (column && column.attrs && column.attrs.prop) === propOrPropArr
    );
    column && (column.hidden = isHidden);
  }
  return columns;
}
