/* eslint-disable react/react-in-jsx-scope */
import { useAuthContext } from '../../../context'
import { Container, Textarea } from '../index'

export type T = {
  articleId: string | undefined
}

export function CommentsContainer({ articleId }: T) {
  const { user } = useAuthContext()
  return (
    <div className="mx-auto mb-[100px]">
      {user?.uid ? (
        <Textarea articleId={articleId} />
      ) : (
        <Container articleId={articleId} />
      )}
    </div>
  )
}
