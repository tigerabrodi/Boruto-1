/* eslint-disable react/react-in-jsx-scope */

import { FiEdit3, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { T } from '../container'

export function Buttons({ articleId }: T) {
  const deleteArticle = () => {
    console.log('hello')
  }

  return (
    <div className="absolute top-[15px] right-[20px] flex">
      <Link
        to={`/article/edit/${articleId}`}
        className="bg-[#f0f0f0cb] w-[65px] text-[25px] p-[8px] flex justify-center rounded-[2px] mr-[10px] transition ease-in-out duration-200 hover:bg-white"
      >
        <FiEdit3 />
      </Link>
      <button
        onClick={deleteArticle}
        aria-label="Delete article"
        className="bg-[#f0f0f0cb] w-[65px] text-[25px] p-[8px] flex justify-center rounded-[2px] transition ease-in-out duration-200 hover:bg-white"
      >
        <FiTrash2 />
      </button>
    </div>
  )
}
