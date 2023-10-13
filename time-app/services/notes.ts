import { Note } from "../types/index";
import { getItemFromLocalStorage, setItemToLocalStorage } from "./localStorage";
/**
 * Stores the created note to the localStorage, by using the provided key name
 * @param key
 * @param note
 */
export const setNotesToLocalStorage = (key: string, note: Note) => {
  const list = getItemFromLocalStorage(key) as Note[];
  list.unshift(note);
  setItemToLocalStorage(key, list);
};

/**
 *
 * @param key
 * @returns the list of notes from the localStorage
 */
export const getNotesFromLocalStorage = (key: string): Note[] => {
  return (
    Array.isArray(getItemFromLocalStorage(key))
      ? getItemFromLocalStorage(key)
      : []
  ) as Note[];
};
