/* eslint-disable react/react-in-jsx-scope */
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { ButtonsProps } from '.'
import { CommentType, firebaseDb } from '../../../lib'

export function CommentButton({ articleId }: ButtonsProps) {
  const [comments, setComments] = useState<CommentType[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/comments`
  ) as CollectionReference<CommentType>

  useEffect(() => {
    const getComments = async () =>
      onSnapshot(commentsCollectionReference, (snapshot) => {
        return setComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      })

    return () => {
      getComments()
    }
  }, [firebaseDb, articleId])
  return (
    <button
      aria-label="comment button"
      className="text-[32px]  text-darkGrey  text-darkGrey mb-[50px] flex items-center"
    >
      <IoChatbubblesOutline />
      {comments.length > 0 && (
        <span className="text-[22px] mb-[-4px] ml-[10px]">
          {comments.length}
        </span>
      )}
    </button>
  )
}
