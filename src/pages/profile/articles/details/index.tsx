/* eslint-disable react/react-in-jsx-scope */

/* eslint-disable react/react-in-jsx-scope */
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { CommentType, firebaseDb, LikeType } from '../../../../lib'

type IconsProps = {
  articleId: string
}
export function Details({ articleId }: IconsProps) {
  const [likes, setLikes] = useState<LikeType[]>([])
  const [comments, setComments] = useState<CommentType[]>([])

  const likesCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/likes`
  ) as CollectionReference<LikeType>

  useEffect(() => {
    const unsubscribe = onSnapshot(likesCollectionReference, (snapshot) =>
      setLikes(snapshot.docs.map((doc) => ({ ...doc.data() })))
    )

    return () => {
      unsubscribe()
    }
  }, [])

  const commentsCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/comments`
  ) as CollectionReference<CommentType>

  useEffect(() => {
    const unsubscribe = onSnapshot(commentsCollectionReference, (snapshot) =>
      setComments(snapshot.docs.map((doc) => ({ ...doc.data() })))
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="flex items-center">
      <p className="text-lightGrey mr-[19px] text-[18px] flex items-center">
        <FiThumbsUp className="mr-[5px]" />
        {likes?.length >= 0 && (
          <span className="text-[15px]">{likes?.length}</span>
        )}
      </p>
      <p className="text-lightGrey   text-[21px] flex items-center">
        <IoChatbubblesOutline className="mr-[5px]" />
        {comments?.length >= 0 && (
          <span className="text-[15px]">{comments?.length}</span>
        )}
      </p>
    </div>
  )
}
