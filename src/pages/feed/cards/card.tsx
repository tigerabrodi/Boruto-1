/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */

import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { firebaseDb, ArticleType, UserType } from '../../../lib/'
import { Author } from '.'
import { Icons } from './icons'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

type CardProps = ArticleType
export function Card({
  timestamp,
  articleId,
  uid,
  text,
  title,
  readMin,
  coverUrl,
}: CardProps) {
  const [profile, setProfile] = useState<UserType[]>([])

  const userCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  useEffect(() => {
    const getProfile = () => {
      onSnapshot(userCollectionReference, (snapshot) => {
        setProfile(
          snapshot.docs.map((doc) => ({ ...doc.data(), profileId: doc.id }))
        )
      })
    }
    getProfile()
  }, [])

  return (
    <div className="mx-auto my-[15px] w-[650px] bg-white border border-border p-[30px] rounded-[8px]">
      <div
        className="w-[100%] h-[300px] mx-auto mb-[30px] rounded-[4px] relative bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${coverUrl})`,
        }}
      />
      <Link
        aria-label={title}
        to={`/articles/${articleId}`}
        className="text-[30px] font-semibold text-dark hover:underline"
      >
        {title}
      </Link>
      <br /> <br />
      <Link to={`/articles/${articleId}`}>
        <ReactMarkdown
          children={text.substr(0, 185) + '...'}
          className="text-darkGrey"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        />
      </Link>
      <div className="flex justify-between items-baseline mt-[30px]">
        {profile.map((info) => {
          return (
            <Author
              key={info.profileId}
              avatarUrl={info.avatarUrl}
              fullname={info.fullname}
              readMin={readMin}
              pin={info.pin}
              uid={uid}
              profileId={info.profileId}
              timestamp={timestamp}
            />
          )
        })}

        <Icons articleId={articleId} />
      </div>
    </div>
  )
}
