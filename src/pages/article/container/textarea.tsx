/* eslint-disable react/react-in-jsx-scope */

import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context'
import { firebaseDb } from '../../../lib'

export function Textarea() {
  const [profile, setProfile] = useState<DocumentData>()

  const { user } = useAuthContext()

  const avatarDocumentReference = doc(firebaseDb, `users/${user?.uid}`)

  useEffect(() => {
    const unsubscribe = onSnapshot(avatarDocumentReference, (doc) => {
      setProfile(doc.data())
    })

    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <div className="w-[800px] bg-white border border-border rounded-[8px]">
      {profile && (
        <div className="flex items-center p-[30px] border-b border-border">
          <img
            src={profile.avatarUrl}
            alt="Your profile picture"
            className="rounded-[50%] w-[60px]"
          />
          <div className="ml-[15px]">
            <p className="font-semibold">{profile.fullname}</p>
            <p className="text-darkGrey ] pt-[3px]">
              {profile.bio.substr(0, 85) + '...'}
            </p>
          </div>
        </div>
      )}
      <label htmlFor="Comment"></label>
      <textarea
        name="Comment"
        id="Comment"
        className="w-[100%] h-[280px] resize-none p-[30px] text-[18px] leading-[2] border-b border-border"
      />
      <button className="my-[30px] mx-auto flex justify-center  text-blue border border-blue py-[6px] w-[120px] rounded-[30px] hover:bg-hoverOutlined transition ease-in-out duration-200 ">
        Post
      </button>
    </div>
  )
}
