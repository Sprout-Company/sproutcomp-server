
import { useEffect } from 'react'

let title = '';
let titleElement = null;

/**
 * Set new page title
 */
export const setTitle = (newTitle) => {
  if (newTitle === title) return;
  
  if (!titleElement) {
    titleElement = document.querySelector('title');
    
    if (!titleElement) {
      titleElement = document.createElement('title');
      document.querySelector('head').appendChild(titleElement);
    }
  }
  
  title = newTitle;
  titleElement.innerText = newTitle;
}

/**
 * Return current title
 */
export const getTitle = () => title;