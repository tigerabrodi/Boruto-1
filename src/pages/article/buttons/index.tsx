/* eslint-disable react/react-in-jsx-scope */

import { LikeButton, CommentButton } from '../index'

export type ButtonsProps = {
  articleId: string | undefined
}
export function Buttons({ articleId }: ButtonsProps) {
  return (
    <div className="relative ">
      <div className="fixed flex flex-col ml-[50px] mt-[300px]">
        <LikeButton articleId={articleId} />
        <CommentButton articleId={articleId} />
      </div>
    </div>
  )
}
