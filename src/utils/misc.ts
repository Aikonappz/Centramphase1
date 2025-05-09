const transformArrayToLabelValue = (array: any) => {
    return array.map((item: any) => ({
      label: item.name,
      value: item.id,
      organisationId: item.organisationId,
      businessUnitId: item.businessUnitId
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