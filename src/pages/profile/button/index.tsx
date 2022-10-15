/* eslint-disable react/react-in-jsx-scope */
import {
  CollectionReference,
  deleteDoc,
  onSnapshot,
  setDoc,
  doc,
  collection,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context'
import { firebaseDb, FollowType } from '../../../lib'

type ButtonProps = {
  profileId: string | undefined
}

export function Button({ profileId }: ButtonProps) {
  const [follows, setFollows] = useState<FollowType[]>([])
  const [hasFollowed, sethasFollowed] = useState(false)
  const followersCollectionReference = collection(
    firebaseDb,
    `users/${profileId}/followers`
  ) as CollectionReference<FollowType>

  const { user } = useAuthContext()

  useEffect(
    () =>
      onSnapshot(followersCollectionReference, (snapshot) =>
        setFollows(
          snapshot.docs.map((doc) => ({ ...doc.data(), followersId: doc.id }))
        )
      ),
    [firebaseDb, profileId]
  )

  useEffect(
    () =>
      sethasFollowed(
        follows.findIndex((like) => like.followersId === user?.uid) !== -1
      ),
    [follows]
  )

  const followUser = async () => {
    if (hasFollowed) {
      await deleteDoc(
        doc(firebaseDb, `users/${profileId}/followers/${user?.uid}`)
      )
    } else {
      await setDoc(
        doc(firebaseDb, `users/${profileId}/followers/${user?.uid}`),
        {
          followUid: user?.uid,
          profile: profileId,
        }
      )
    }
  }
  return (
    <>
      {user?.uid && (
        <>
          {hasFollowed ? (
            <button
              onClick={followUser}
              className="top-[30px] right-[30px] text-blue border border-blue absolute flex py-[6px] px-[12px] text-base rounded-[30px] hover:bg-hoverOutlined  transition ease-in-out duration-200 "
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={followUser}
              className="top-[30px] right-[30px] text-white bg-blue absolute flex py-[6px] px-[12px] text-base rounded-[30px] hover:bg-hoverFilled  transition ease-in-out duration-200 "
            >
              Follow
            </button>
          )}
        </>
      )}
    </>
  )
}
