export const columns = [
  {
    attrs: {
      prop: "dataType",
      label: "测试1",
      width: "200",
      formatter: (row, column, cellValue) => {
        let options = [
          {
            key: "1",
            name: "医保目录"
          },
          {
            key: "2",
            name: "医院目录"
          },
          {
            key: "3",
            name: "医保-医院映射"
          }
        ];
        return (
          options.find(option => option.key === cellValue) &&
          options.find(option => option.key === cellValue).name
        );
      }
    }
  },
  {
    attrs: {
      prop: "infoType",
      label: "测试2",
      width: "200",
      formatter: (row, column, cellValue) => {
        let options = [
          {
            key: "1",
            name: "医疗目录"
          },
          {
            key: "2",
            name: "疾病目录"
          },
          {
            key: "3",
            name: "手术目录"
          }
        ];
        return (
          options.find(option => option.key === cellValue) &&
          options.find(option => option.key === cellValue).name
        );
      }
    }
  },
  {
    attrs: {
      prop: "requestTime",
      label: "测试4",
      width: "200"
    }
  },
  {
    slot: "testSlot",
    attrs: {
      prop: "testSlot",
      label: "测试插槽"
    }
  }
];
