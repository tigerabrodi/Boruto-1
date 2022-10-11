/* eslint-disable react/react-in-jsx-scope */

import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { T } from '.'
import { CommentType, firebaseDb } from '../../../lib'

export function Container({ articleId }: T) {
  const [comments, setComments] = useState<CommentType[]>([])

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
    <div className="flex items-center justify-between mb-[5px] w-[800px] bg-white p-[30px] rounded-[8px] border border-border">
      <p className="font-semibold text-[25px]">Comments ({comments?.length})</p>

      <button className="border border-blue py-[8px] px-[16px] rounded-[4px] text-blue transition ease-in-out duration-200 hover:bg-hoverOutlined">
        Write a comment
      </button>
    </div>
  )
}
