/* eslint-disable react/react-in-jsx-scope */

import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { useMenuContext } from '../../../context/MenuContext'
import { firebaseDb } from '../../../lib/firebase'

export const DEFAULT_AVATAR =
  'https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1659089761812%2FfsOct5gl6.png&w=1920&q=75'

export function Avatar() {
  const [avatar, setAvatar] = useState<DocumentData>()
  const { isOpen, setIsOpen } = useMenuContext()

  const { user } = useAuthContext()

  const avatarDocumentReference = doc(firebaseDb, `users/${user?.uid}`)

  onSnapshot(avatarDocumentReference, (doc) => {
    setAvatar(doc.data())
  })

  return (
    <>
      {user?.uid ? (
        <>
          {avatar && (
            <button aria-label="authenticated nav menu">
              <img
                src={avatar.avatarUrl}
                alt=""
                className="w-14 rounded-[50%]"
              />
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="unauthenticated nav menu"
        >
          <img src={DEFAULT_AVATAR} alt="" className="w-12" />
        </button>
      )}
    </>
  )
}
