/* eslint-disable react/react-in-jsx-scope */
import { VscEllipsis } from 'react-icons/vsc'
import { useAuthContext } from '../../../../context'

type EllipsisProps = {
  commentUid: string
}

export function Ellipsis({ commentUid }: EllipsisProps) {
  const { user } = useAuthContext()
  return (
    <>
      {user?.uid === commentUid && (
        <button className="absolute top-[10px] right-[15px] text-[20px]">
          <VscEllipsis />
        </button>
      )}
    </>
  )
}
