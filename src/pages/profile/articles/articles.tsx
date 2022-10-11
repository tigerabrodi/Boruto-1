/* eslint-disable react/react-in-jsx-scope */
import {
  query,
  orderBy,
  onSnapshot,
  collection,
  CollectionReference,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb, ArticleType } from '../../../lib/'
import Article from './article'
type ArticlesProps = {
  pin: string
  fullname: string
}

export function Articles({ pin }: ArticlesProps) {
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
    <div className="grid grid-cols-2  mx-auto w-[815px] mb-[50px]">
      {articles.map(
        ({ articleId, uid, title, readMin, coverUrl, timestamp }) => {
          return (
            <Article
              pin={pin}
              uid={uid}
              title={title}
              key={articleId}
              readMin={readMin}
              coverUrl={coverUrl}
              articleId={articleId}
              timestamp={timestamp}
            />
          )
        }
      )}
    </div>
  )
}
