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

/* eslint-disable react/react-in-jsx-scope */
export default function Article() {
  const [profile, setProfile] = useState<UserType[]>([])
  const [isArticle, setIsArticle] = useState<DocumentData>()
  const { id } = useParams<ParamsType>()

  const avatarDocumentReference = doc(firebaseDb, `articles/${id}`)

  const userCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  useEffect(() => {
    const unsubscribe = onSnapshot(avatarDocumentReference, (doc) => {
      setIsArticle(doc.data())
    })

    return () => {
      unsubscribe()
    }
  }, [])

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
    <div className="pt-[150px] pb-[50px] flex justify-center ">
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

          <Buttons />
        </>
      )}
    </div>
  )
}
