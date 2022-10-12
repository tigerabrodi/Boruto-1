/* eslint-disable react/react-in-jsx-scope */

import { LikeButton, CommentButton } from '../index'

export type LikeCommentProps = {
  articleId: string | undefined
}
export function LikeComment({ articleId }: LikeCommentProps) {
  return (
    <div className="relative ">
      <div className="fixed flex flex-col ml-[50px] mt-[300px]">
        <LikeButton articleId={articleId} />
        <CommentButton articleId={articleId} />
      </div>
    </div>
  )
}
