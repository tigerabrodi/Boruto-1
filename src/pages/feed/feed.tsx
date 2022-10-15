/* eslint-disable react/react-in-jsx-scope */

import { useState } from 'react'
import { Users } from '.'
import { Cards } from './cards/cards'

export default function Feed() {
  const [isUsers, setIsUsers] = useState(false)
  return (
    <div className="pt-[113px]">
      <div className="text-[18px] border border-border rounded-[8px] p-[30px] flex justify-evenly bg-white w-[650px] mx-auto">
        <button
          onClick={() => setIsUsers(false)}
          className={isUsers ? 'text-darkGrey' : 'text-blue'}
        >
          Articles
        </button>
        <button
          onClick={() => setIsUsers(true)}
          className={isUsers ? 'text-blue' : 'text-darkGrey'}
        >
          Users
        </button>
      </div>

      {isUsers ? <Users /> : <Cards />}
    </div>
  )
}
