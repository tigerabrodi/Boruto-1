/* eslint-disable react/react-in-jsx-scope */

import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { DeleteComment } from '../../../components'
import { useAuthContext } from '../../../context'
import {
  firebaseDb,
  getDateWithTimestamp,
  getTimestamp,
  UserType,
} from '../../../lib'

type L = {
  comment: string
  commentId: string
  commentUid: string
  articleId: string | undefined
  timestamp: {
    seconds: number
    nanoseconds: number
  }
}

export function Comment({
  comment,
  commentUid,
  commentId,
  articleId,
  timestamp,
}: L) {
  const [openModal, setOpenModal] = useState(false)
  const [profile, setProfile] = useState<UserType[]>([])
  const { user } = useAuthContext()

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
    <>
      <DeleteComment
        openModal={openModal}
        setOpenModal={setOpenModal}
        articleId={articleId}
        commentId={commentId}
      />
      <div className="bg-white rounded-[8px] border border-border w-[800px] mx-auto mb-[15px] relative">
        {commentUid === user?.uid && (
          <button
            onClick={() => setOpenModal(true)}
            className="absolute bg-border text-[19px] py-[5px] px-[10px] rounded-[4px] top-[12px] right-[15px]"
          >
            <FiTrash2 />
          </button>
        )}

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
                    <Link
                      className="font-semibold hover:underline"
                      to={`/profiles/${profileId}`}
                    >
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
    </>
  )
}
