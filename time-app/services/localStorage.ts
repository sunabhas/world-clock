/**
 *
 * @param key
 * @returns an array of the name same as key from localStorage
 */
export const getItemFromLocalStorage = (key: string): unknown => {
  const data = JSON.parse(window.localStorage.getItem(key) || "[]");
  return data;
};

/**
 * Sets an item to the localStorage with the provided key name
 * @param key
 * @param item
 */
export const setItemToLocalStorage = (key: string, item: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};
