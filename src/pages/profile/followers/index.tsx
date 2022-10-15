/* eslint-disable react/react-in-jsx-scope */

import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firebaseDb, LikeType } from '../../../lib'

type FollowersProps = {
  profileId: string | undefined
}

export function Followers({ profileId }: FollowersProps) {
  const [likes, setLikes] = useState<LikeType[]>([])

  const likeCollectionReference = collection(
    firebaseDb,
    `users/${profileId}/followers/`
  ) as CollectionReference<LikeType>

  useEffect(
    () =>
      onSnapshot(likeCollectionReference, (snapshot) =>
        setLikes(snapshot.docs.map((doc) => ({ ...doc.data() })))
      ),
    [firebaseDb, profileId]
  )

  return (
    <p className="rounded-[3px] text-[14px] bg-border inline-block px-[8px] py-[2px]">
      <span className="font-semibold mr-[3px]">{likes.length}</span> Followers
    </p>
  )
}
