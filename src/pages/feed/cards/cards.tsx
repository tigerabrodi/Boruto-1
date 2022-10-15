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
import { Card } from '.'

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
    <div className="flex flex-col justify-center">
      {articles.map((article) => {
        return <Card article={article} key={article.articleId} />
      })}
    </div>
  )
}
