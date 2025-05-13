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

export { transformArrayToLabelValue };