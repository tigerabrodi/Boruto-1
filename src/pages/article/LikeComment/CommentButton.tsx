/* eslint-disable react/react-in-jsx-scope */
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { LikeCommentProps } from '.'
import { CommentType, firebaseDb } from '../../../lib'

export function CommentButton({ articleId }: LikeCommentProps) {
  const [comments, setComments] = useState<CommentType[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/comments`
  ) as CollectionReference<CommentType>

  useEffect(
    () =>
      onSnapshot(commentsCollectionReference, (snapshot) =>
        setComments(snapshot.docs.map((doc) => ({ ...doc.data() })))
      ),
    [firebaseDb, articleId]
  )

  return (
    <p className="text-[32px]  text-darkGrey  text-darkGrey mb-[50px] flex items-center">
      <IoChatbubblesOutline />
      {comments.length >= 0 && (
        <span className="text-[22px]  ml-[10px]">{comments.length}</span>
      )}
    </p>
  )
}
