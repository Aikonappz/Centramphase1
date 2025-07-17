const transformArrayToLabelValue = (array: any, islabel?: any) => {
  return array.map((item: any) => ({
    label: item.name,
    value: islabel ? item.name : Number(item.id)
  }));
}
// const transformMultipleArrays = (arraysObj: any) => {
//     const result = [];
//     for (const [arrayName, array] of Object.entries(arraysObj)) {
//       result.push(...array.map((item: any) => ({
//         label: arrayName,
//         value: item.id
//       })));
//     }
//     return result;
// }

const formatDate = (date: any) => {
  return date.toISOString().split('T')[0];
}

const toNumber = (value: any, precision: number | undefined) => {
  precision = precision || 0;
  if (precision === 0) {
    return value * 1;
  } else {
    return Number((value * 1).toFixed(precision));
  }
}

const removeEmptyParams = (params: any): Record<any, any> => {
  const cleaned: Record<string, string> = {};
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = String(value);
    }
  });
  
  return cleaned;
}

export { transformArrayToLabelValue, formatDate, toNumber, removeEmptyParams };