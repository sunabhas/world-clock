/** All the commonly used functions to be declared here */

const getUniqueItems = (arr: string[]) => [...new Set(arr)];



export const getAreas = (list: string[]) => {

  const mappedList = list?.map((item) => {
    const [firstPart] = item.split('/');
    return { value: firstPart, label: firstPart };
  });

  const uniqueList = mappedList?.filter(
    (item, index, self) => self?.findIndex((i) => i.value === item.value) === index
  );

  return uniqueList;
}

export const getLocations = (list: string[], selectedArea: string) => {
  if (list?.length === 0 || selectedArea === '') return [];

  const filteredList = list
  ?.filter((item) => item.startsWith(selectedArea + '/'))
  ?.map((item) => item?.split('/')[1]); // Extract the second part
  const uniqueList = getUniqueItems(filteredList);

  return uniqueList.map((item) => ({
    value: item,
    label: item,
  }));
}
  