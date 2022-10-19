import React from 'react'

function TodoItem({item}) {
  return (
    <div>
      TODO ITEM
        <ul>
          <li>
            title:   {item.title}
          </li>
          <li>
          completed: {item.completed}
            </li>
        </ul>
       </div>

  )
}

export default TodoItem