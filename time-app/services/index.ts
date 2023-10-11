import { Note } from '../types/index'

// Parse localStorage item, and if it's not an array or null, return an empty array.
export const getItemFromLocalStorage = (key: string): any[] => {
    const data = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(data) ? data : [];
  }
  
  // Serialize and set an item in localStorage.
  export const setItemToLocalStorage = (key: string, item: any) => {
    window.localStorage.setItem(key, JSON.stringify(item));
  }
  
  // Set an array of notes in localStorage.
  export const setNotesToLocalStorage = (key: string, note: Note) => {
    const list = getItemFromLocalStorage(key);
    list.unshift(note)
    setItemToLocalStorage(key, list);
  }
  
  // Get an array of notes from localStorage.
  export const getNotesFromLocalStorage = (key: string): Note[] => {
    return getItemFromLocalStorage(key);
  }
  