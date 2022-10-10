/* eslint-disable react/react-in-jsx-scope */

import type { CollectionReference } from 'firebase/firestore'
import type { ArticleType } from '../../../lib/types'

import { query, orderBy, onSnapshot, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb } from '../../../lib/firebase'
import { Card } from './card'

export function Cards() {
  const [articles, setArticles] = useState<ArticleType[]>([])

  const ArticlesCollectionReference = collection(
    firebaseDb,
    'articles'
  ) as CollectionReference<ArticleType>

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(ArticlesCollectionReference, orderBy('timestamp', 'desc')),
      (snapshot) => {
        setArticles(
          snapshot.docs.map((doc) => ({ ...doc.data(), articleId: doc.id }))
        )
      }
    )

    return () => {
      unsubscribe()
    }
  }, [firebaseDb])

  return (
    <div className="flex flex-col justify-center pt-[150px]">
      {articles.map(({ articleId, uid, text, title, readMin, coverUrl }) => {
        return (
          <Card
            uid={uid}
            text={text}
            title={title}
            key={articleId}
            readMin={readMin}
            coverUrl={coverUrl}
            articleId={articleId}
            subtitle={''}
          />
        )
      })}
    </div>
  )
}
