/* eslint-disable react/react-in-jsx-scope */

import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import {
  firebaseDb,
  FollowType,
  getDateWithTimestamp,
  getTimestamp,
  UserType,
} from '../../../lib'
import { Link } from 'react-router-dom'

type UserProps = {
  user: UserType
}

export function User({
  user: {
    profileId,
    createdAt,
    avatarUrl,
    age,
    bio,
    fullname,
    location,
    username,
  },
}: UserProps) {
  const [followers, setFollowers] = useState<FollowType[] | null>(null)
  const followersCollectionReference = collection(
    firebaseDb,
    `users/${profileId}/followers`
  ) as CollectionReference<FollowType>

  useEffect(
    () =>
      onSnapshot(followersCollectionReference, (snapshot) =>
        setFollowers(snapshot.docs.map((doc) => ({ ...doc.data() })))
      ),
    [firebaseDb, profileId]
  )
  return (
    <div className="relative flex  bg-white w-[650px] mx-auto border border-border mt-[15px] p-[30px] rounded-[8px] ">
      <p
        className="absolute text-lightGrey top-[10px] right-[10px] text-[14px]"
        aria-label={`Member since: ${getDateWithTimestamp(
          getTimestamp(createdAt)
        )}`}
      >
        Since: {getDateWithTimestamp(getTimestamp(createdAt))}
      </p>
      <div>
        <Link to={`/profiles/${profileId}`} aria-label="Visit profile">
          <img
            src={avatarUrl}
            alt="Your profile picture"
            className="w-[100px] rounded-[50%] hover:opacity-80 transition ease-in-out duration-200 mb-[10px]"
          />
        </Link>
        <Link
          to={`/profiles/${profileId}`}
          tabIndex={0}
          className="text-lightGrey text-[14px] text-center hover:underline"
        >
          @{username}
        </Link>
      </div>
      <div className=" ml-[30px] self-center">
        <p
          tabIndex={0}
          className="rounded-[3px] text-[14px] bg-border inline-block px-[8px] py-[2px]"
        >
          <span className="font-semibold mr-[5px]">{followers?.length}</span>
          Followers
        </p>

        <div className="flex items-center mt-[8px]">
          <p
            tabIndex={0}
            className=" font-semibold text-base "
            aria-label={`Your full name`}
          >
            {fullname}
          </p>
          <p className="text-[22px] mx-[10px]">·</p>
          <p
            tabIndex={0}
            aria-label={`${age} years old`}
            className=" font-semibold text-base "
          >
            {age} y/o
          </p>
          <p className="text-[22px] mx-[10px]">·</p>
          <p
            tabIndex={0}
            className=" font-semibold text-base "
            aria-label={`Your full location`}
          >
            {location}
          </p>
        </div>

        <p
          tabIndex={0}
          className="mt-[5px]  text-base "
          aria-label={`Your full biography`}
        >
          {bio}
        </p>
      </div>
    </div>
  )
}
