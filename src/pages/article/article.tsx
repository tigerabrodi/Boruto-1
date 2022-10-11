import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  onSnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseDb, ParamsType, UserType } from '../../lib'
import { Author } from '.'
import { Buttons } from './buttons'
import { CommentsContainer, Comments } from '../article/index'
import { InfoModal } from '../../components'
import { useInfoContext } from '../../context'

/* eslint-disable react/react-in-jsx-scope */
export default function Article() {
  const [profile, setProfile] = useState<UserType[]>([])
  const [isArticle, setIsArticle] = useState<DocumentData>()
  const { id } = useParams<ParamsType>()
  const { popup } = useInfoContext()

  const articleDocumentRef = doc(firebaseDb, `articles/${id}`)

  const userCollectionRef = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  useEffect(() => {
    const unsubscribe = onSnapshot(articleDocumentRef, (doc) => {
      setIsArticle(doc.data())
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const getProfile = () => {
      onSnapshot(userCollectionRef, (snapshot) => {
        setProfile(
          snapshot.docs.map((doc) => ({ ...doc.data(), profileId: doc.id }))
        )
      })
    }
    getProfile()
  }, [])

  return (
    <>
      {popup === true ? <InfoModal /> : ''}
      <div className="flex flex-col justify-center pb-[50px]">
        <div className="pt-[150px] pb-[15px] flex justify-center ">
          {isArticle && (
            <>
              <div className="bg-white p-[30px] w-[800px]  border border-border rounded-[8px] ">
                <div
                  className="w-[100%] h-[400px] mx-auto mb-[30px] rounded-[4px] relative bg-no-repeat bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${isArticle.coverUrl})`,
                  }}
                />
                <h1 className="text-[30px] pb-[10px] font-semibold text-center">
                  {isArticle.title}
                </h1>
                <h2 className="text-[28px] pb-[20px]  text-center text-darkGrey">
                  {isArticle.subtitle}
                </h2>

                <div className="flex items-center justify-center mb-[30px]">
                  {profile.map((info) => {
                    return (
                      <Author
                        pin={info.pin}
                        uid={isArticle.uid}
                        key={info.profileId}
                        profileId={info.profileId}
                        avatarUrl={info.avatarUrl}
                        fullname={info.fullname}
                        createdAt={info.createdAt}
                        readMin={isArticle.readMin}
                      />
                    )
                  })}
                </div>

                <p className="text-[18px] leading-[2]">{isArticle.text}</p>
              </div>

              <Buttons articleId={id} />
            </>
          )}
        </div>
        <CommentsContainer articleId={id} />
        <Comments articleId={id} />
      </div>
    </>
  )
}
