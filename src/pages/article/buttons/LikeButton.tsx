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
import { FiThumbsUp } from 'react-icons/fi'
import { ButtonsProps } from '.'
import { useAuthContext, useInfoContext } from '../../../context'
import { firebaseDb, LikeType } from '../../../lib'

export function LikeButton({ articleId }: ButtonsProps) {
  const [likes, setLikes] = useState<LikeType[]>([])
  const [hasLiked, setHasLiked] = useState(false)
  const likeCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/likes/`
  ) as CollectionReference<LikeType>

  const { user } = useAuthContext()
  const { setPopup } = useInfoContext()

  useEffect(
    () =>
      onSnapshot(likeCollectionReference, (snapshot) =>
        setLikes(
          snapshot.docs.map((doc) => ({ ...doc.data(), likeId: doc.id }))
        )
      ),
    [firebaseDb, articleId]
  )

  useEffect(
    () =>
      setHasLiked(likes.findIndex((like) => like.likeId === user?.uid) !== -1),
    [likes]
  )

  const likeArticle = async () => {
    if (hasLiked) {
      await deleteDoc(
        doc(firebaseDb, `articles/${articleId}/likes/${user?.uid}`)
      )
    } else {
      await setDoc(
        doc(firebaseDb, `articles/${articleId}/likes/${user?.uid}`),
        {
          likeUid: user?.uid,
          article: articleId,
        }
      )
    }
  }
  return (
    <>
      {user?.uid ? (
        <>
          {hasLiked ? (
            <button
              aria-label="like button"
              onClick={likeArticle}
              className="text-[26px] text-blue mb-[50px] flex items-center"
            >
              <FiThumbsUp />{' '}
              {likes.length >= 0 && (
                <span className="text-[22px] mb-[-4px] ml-[10px]">
                  {likes.length}
                </span>
              )}
            </button>
          ) : (
            <button
              aria-label="like button"
              onClick={likeArticle}
              className="text-[26px] text-darkGrey mb-[50px] flex items-center"
            >
              <FiThumbsUp />{' '}
              {likes.length >= 0 && (
                <span className="text-[22px] mb-[-4px] ml-[10px]">
                  {likes.length}
                </span>
              )}
            </button>
          )}
        </>
      ) : (
        <button
          aria-label="like button"
          onClick={() => setPopup(true)}
          className="text-[26px] text-darkGrey mb-[50px] flex items-center"
        >
          <FiThumbsUp />{' '}
          {likes.length >= 0 && (
            <span className="text-[22px] mb-[-4px] ml-[10px]">
              {likes.length}
            </span>
          )}
        </button>
      )}
    </>
  )
}
