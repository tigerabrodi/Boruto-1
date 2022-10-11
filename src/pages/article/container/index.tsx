/* eslint-disable react/react-in-jsx-scope */
import { useAuthContext } from '../../../context'
import { Container, Textarea } from '../index'
export function CommentsContainer() {
  const { user } = useAuthContext()
  return (
    <div className="mx-auto mb-[100px]">
      {user?.uid ? <Textarea /> : <Container />}
    </div>
  )
}
