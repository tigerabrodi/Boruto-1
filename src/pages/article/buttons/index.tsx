/* eslint-disable react/react-in-jsx-scope */

import { LikeButton, CommentButton } from '../index'

export function Buttons() {
  return (
    <div className="relative ">
      <div className="fixed flex flex-col ml-[30px] mt-[300px]">
        <LikeButton />
        <CommentButton />
      </div>
    </div>
  )
}
