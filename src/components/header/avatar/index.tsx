/* eslint-disable react/react-in-jsx-scope */

import { useAuthContext } from '../../../context/AuthContext'

export const DEFAULT_AVATAR =
  'https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75'

export function Avatar() {
  const { user } = useAuthContext()

  return (
    <>
      {user?.uid ? (
        <button aria-label="authenticated nav menu">
          <img src="" alt="" className="w-12" />
        </button>
      ) : (
        <button aria-label="unauthenticated nav menu">
          <img src={DEFAULT_AVATAR} alt="" className="w-12" />
        </button>
      )}
    </>
  )
}
