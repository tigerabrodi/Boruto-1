/* eslint-disable react/react-in-jsx-scope */

import {
  collection,
  CollectionReference,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { CommentType, firebaseDb } from '../../../lib'
import { T } from '../container'
import { Comment } from '../comments/comment'

export function Comments({ articleId }: T) {
  const [comments, setComments] = useState<CommentType[]>([])

  const commentsCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/comments`
  ) as CollectionReference<CommentType>

  useEffect(
    () =>
      onSnapshot(
        query(commentsCollectionReference, orderBy('timestamp', 'desc')),
        (snapshot) =>
          setComments(
            snapshot.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }))
          )
      ),
    [firebaseDb, articleId]
  )

  return (
    <div>
      {comments.map(({ comment, commentUid, commentId, timestamp }) => {
        return (
          <Comment
            key={commentId}
            comment={comment}
            timestamp={timestamp}
            commentUid={commentUid}
            articleId={articleId}
            commentId={commentId}
          />
        )
      })}
    </div>
  )
}
