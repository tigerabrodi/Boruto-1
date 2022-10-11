/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useAuthContext, useMenuContext } from '../../../context'
import { DEFAULT_AVATAR, firebaseDb } from '../../../lib'

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
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="authenticated nav menu"
            >
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
