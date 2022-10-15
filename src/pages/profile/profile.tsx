/* eslint-disable react/react-in-jsx-scope */

import { doc, DocumentReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../../context'
import { firebaseDb, ParamsType, UserType } from '../../lib'
import { Articles, Button, Followers } from './index'

export default function Profile() {
  const { user } = useAuthContext()
  const [profile, setProfile] = useState<UserType | null>(null)
  const { id } = useParams<ParamsType>()

  const usersDocumentRef = doc(
    firebaseDb,
    `users/${id}`
  ) as DocumentReference<UserType>

  useEffect(
    () =>
      onSnapshot(usersDocumentRef, (doc) => {
        const docData = doc.data()
        if (docData) {
          setProfile(docData)
        }
      }),

    []
  )

  return (
    <div className="flex flex-col justify-center pt-[120px]">
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
                className="text-lightGrey text-[14px] mt-[10px] text-center"
                aria-label={`Your username`}
              >
                @{profile.username}
              </p>
            </div>
            <div className=" ml-[30px] self-center">
              <Followers profileId={id} />

              <div className="flex items-center mt-[8px]">
                <p
                  tabIndex={0}
                  className=" font-semibold text-base "
                  aria-label={`Your full name`}
                >
                  {profile.fullname}
                </p>
                <p className="text-[22px] mx-[10px]">·</p>
                <p className=" font-semibold text-base ">{profile.age} y/o</p>
                <p className="text-[22px] mx-[10px]">·</p>
                <p
                  tabIndex={0}
                  className=" font-semibold text-base "
                  aria-label={`Your full location`}
                >
                  {profile.location}
                </p>
              </div>

              <p
                tabIndex={0}
                className="mt-[5px]  text-base "
                aria-label={`Your full biography`}
              >
                {profile.bio}
              </p>
            </div>
            {profile.pin === user?.uid ? (
              <Link
                to={`/profiles/edit/${id}`}
                aria-label="Edit your profile"
                className="top-[30px] right-[30px] text-white bg-blue absolute flex py-[6px] px-[12px] text-base rounded-[30px] hover:bg-hoverFilled  transition ease-in-out duration-200 "
              >
                <FiEdit3 className="self-center mr-[6px]" /> Edit
              </Link>
            ) : (
              <Button profileId={id} />
            )}
          </div>
          <Articles pin={profile.pin} fullname={profile.fullname} />
        </>
      )}
    </div>
  )
}
