

import { useState, useEffect } from 'react'

/**
 * List items container
 */
export const List = ({ list, className, children, onClick }) => {

  /**  
   * Create a list item
   * @param {string[] | string[][]} object.params
   */
  const createItem = ({ params, key }) => {
    let children = '';
    let title = null;
    let body = null;
    let icon = null;

    if (typeof (params) === 'string') {
      title = params;
      children = title;
    }

    else if (typeof (params) === 'object') {
      icon = params[0];
      title = params[1];
      body = params[2];

      children = (
        <div className='flex items-center'>
          <div> {icon} </div>

          <div className='pl-4 flex flex-col'>
            <div> {title} </div>
            {body &&
              <div className='text-sm text-secondary'> {body} </div>
            }
          </div>
        </div>
      )
    }

    return (
      <ListItem
        key={title}
        onClick={onClick && ((e) => onClick({ title, body, icon, key }))}
        children={children}
      />
    )
  }

  // render 
  return (
    <div className={`${className} list-none p-0 bg-transparent divide-y divide-gray-200`}>
      {children || list.map((params) => createItem({ params }))}
    </div>
  )
}

/**
 * List items.
 */
export const ListItem = ({ children, className, onClick, onLongClick }) => {
  return (
    <div
      className={'list-none p-2 cursor-pointer ' + className}
      onClick={onClick}
    >
      {children}
    </div>
  )
}