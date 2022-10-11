/* eslint-disable react/react-in-jsx-scope */

import { FiThumbsUp } from 'react-icons/fi'

export function LikeButton() {
  return (
    <button
      aria-label="like button"
      className="text-[30px] text-darkGrey mb-[50px]"
    >
      <FiThumbsUp />
    </button>
  )
}
