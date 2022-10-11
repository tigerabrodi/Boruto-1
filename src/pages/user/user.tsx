/* eslint-disable react/react-in-jsx-scope */
import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context'
import { firebaseDb } from '../../lib'

import { FiEdit3 } from 'react-icons/fi'
import { Articles } from '../profile'

export default function User() {
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
    <div className="flex flex-col pt-[130px] mb-[50px]">
      {profile && (
        <>
          <div className="relative flex  bg-white w-[800px] mx-auto border border-border p-[30px] rounded-[8px]">
            <div>
              <img
                src={profile.avatarUrl}
                alt="Your profile picture"
                className="w-[100px] rounded-[50%]"
              />
              <p
                tabIndex={0}
                className="text-lightGrey text-[14px] mt-[5px] text-center"
                aria-label={`Your username`}
              >
                @{profile.username}
              </p>
            </div>
            <div className=" ml-[30px] self-center">
              <p
                tabIndex={0}
                className="font-semibold text-base mb-[8px]"
                aria-label={`Your full name`}
              >
                {profile.fullname}
              </p>
              <p
                tabIndex={0}
                className="rounded-[3px] text-[14px] bg-border inline-block px-[8px] py-[2px]"
                aria-label={`Your full location`}
              >
                {profile.location}
              </p>
              <p
                tabIndex={0}
                className="mt-[8px]  text-base"
                aria-label={`Your full biography`}
              >
                {profile.bio}
              </p>
            </div>
            <button
              aria-label="Edit your profile"
              className="top-[30px] right-[30px] text-white bg-blue absolute flex py-[6px] px-[12px] text-base rounded-[30px] hover:bg-hoverFilled  transition ease-in-out duration-200 "
            >
              <FiEdit3 className="self-center mr-[6px]" /> Edit
            </button>
          </div>
          <Articles pin={profile.pin} fullname={profile.fullname} />
        </>
      )}
    </div>
  )
}
