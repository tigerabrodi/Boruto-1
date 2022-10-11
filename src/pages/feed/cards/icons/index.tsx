/* eslint-disable react/react-in-jsx-scope */
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { CommentType, firebaseDb, LikeType } from '../../../../lib'

type IconsProps = {
  articleId: string
}
export function Icons({ articleId }: IconsProps) {
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
      <p
        aria-label="Go to article"
        className="text-lightGrey mr-[20px] text-[21px]  px-[15px] rounded-[30px] flex items-center"
      >
        <FiThumbsUp className="mr-[5px]" />
        {likes?.length >= 0 && (
          <span className="mt-[3px]">{likes?.length}</span>
        )}
      </p>
      <p className="text-lightGrey   text-[25px]  px-[15px] rounded-[30px] flex items-center">
        <IoChatbubblesOutline className="mr-[5px]" />
        {comments?.length >= 0 && (
          <span className="mt-[3px] text-[21px]">{comments?.length}</span>
        )}
      </p>
    </div>
  )
}
