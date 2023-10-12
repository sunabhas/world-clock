/** All the commonly used functions to be declared here */

/**
 * 
 * @param arr 
 * @returns an array of unique elements by removing the duplicates
 */
const getUniqueItems = (arr: string[]) => [...new Set(arr)];


/**
 * 
 * @param list 
 * @returns a list of area by removing the associated locations
 */
export const getAreas = (list: string[]) => {
  const mappedList = list?.map((item) => {
    const [firstPart] = item.split("/");
    return { value: firstPart, label: firstPart };
  });

  const uniqueList = mappedList?.filter(
    (item, index, self) =>
      self?.findIndex((i) => i.value === item.value) === index
  );

  return uniqueList;
};


/**
 * 
 * @param list 
 * @param selectedArea 
 * @returns the list of location associated with the selected area.
 */
export const getLocations = (list: string[], selectedArea: string) => {
  if (list?.length === 0 || selectedArea === "") return [];

  const filteredList = list
    ?.filter((item) => item.startsWith(selectedArea + "/"))
    ?.map((item) => item?.split("/")[1]); // Extract the second part
  const uniqueList = getUniqueItems(filteredList);

  return uniqueList.map((item) => ({
    value: item,
    label: item,
  }));
};

/**
 * 
 * @param utcDateTime 
 * @returns the date format in readable form
 */
export const formatDateTime = (utcDateTime: string): string => {
  const date = new Date(utcDateTime);
  return date.toLocaleString();
};
