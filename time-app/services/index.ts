import { Note } from '../types/index'
/**
 * 
 * @param key 
 * @returns an array of the name same as key from localStorage
 */
export const getItemFromLocalStorage = (key: string): any[] => {
    const data = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(data) ? data : [];
  }

  /**
   * Sets an item to the localStorage with the provided key name
   * @param key 
   * @param item 
   */
  export const setItemToLocalStorage = (key: string, item: any) => {
    window.localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * 
   * @param key 
   * @param note 
   */
  export const setNotesToLocalStorage = (key: string, note: Note) => {
    const list = getItemFromLocalStorage(key);
    list.unshift(note)
    setItemToLocalStorage(key, list);
  }
  
  // Get an array of notes from localStorage.
  export const getNotesFromLocalStorage = (key: string): Note[] => {
    return getItemFromLocalStorage(key);
  }
  