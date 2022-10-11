/* eslint-disable react/react-in-jsx-scope */

import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CommentType,
  firebaseDb,
  getDateWithTimestamp,
  getTimestamp,
  UserType,
} from '../../../lib'

export function Comment({ comment, commentUid, timestamp }: CommentType) {
  const [profile, setProfile] = useState<UserType[]>([])

  const userCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  useEffect(() => {
    const getProfile = () => {
      onSnapshot(userCollectionReference, (snapshot) => {
        setProfile(
          snapshot.docs.map((doc) => ({ ...doc.data(), profileId: doc.id }))
        )
      })
    }
    getProfile()
  }, [])
  return (
    <div className="bg-white rounded-[8px] border border-border w-[800px] mx-auto mb-[15px] relative">
      {profile.map(({ profileId, avatarUrl, fullname, bio, pin }) => {
        return (
          <div key={profileId}>
            {pin === commentUid && (
              <div className="flex items-center py-[20px] px-[30px] border-b border-border">
                <img
                  src={avatarUrl}
                  alt="Your profile picture"
                  className="w-[60px] rounded-[50%] mr-[15px]"
                />
                <span>
                  <Link className="font-semibold" to={`/profile/${profileId}`}>
                    {fullname}
                  </Link>
                  <p className="text-darkGrey ] pt-[3px]">
                    {bio.substr(0, 80) + '...'}
                  </p>
                </span>
              </div>
            )}
          </div>
        )
      })}
      <p className="p-[30px] pb-[30px]">{comment}</p>
      <p className="bottom-[15px] right-[20px] absolute text-[14px] text-lightGrey">
        {getDateWithTimestamp(getTimestamp(timestamp))}
      </p>
    </div>
  )
}
