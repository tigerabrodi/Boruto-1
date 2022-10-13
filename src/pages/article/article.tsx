/* eslint-disable react/no-children-prop */
/* eslint-disable react/react-in-jsx-scope */
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  onSnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { InfoModal } from '../../components'
import { useAuthContext, useInfoContext } from '../../context'
import { ArticleType, firebaseDb, ParamsType, UserType } from '../../lib'
import { Author, LikeComment, Comments, CommentsContainer, Buttons } from '.'
import DeleteArticle from '../../components/modal/DeleteArticle'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function Article() {
  const [profile, setProfile] = useState<UserType[]>([])
  const [isArticle, setIsArticle] = useState<ArticleType | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const { id } = useParams<ParamsType>()
  const { popup } = useInfoContext()
  const { user } = useAuthContext()

  const articleDocumentRef = doc(
    firebaseDb,
    `articles/${id}`
  ) as DocumentReference<ArticleType>

  useEffect(() => {
    const unsubscribe = onSnapshot(articleDocumentRef, (doc) => {
      const docData = doc.data()
      if (docData) {
        setIsArticle(docData)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const userCollectionRef = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

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
      {openModal === true && (
        <DeleteArticle articleId={id} setOpenModal={setOpenModal} />
      )}
      <div className="flex flex-col justify-center pb-[50px]">
        <div className="pt-[150px] pb-[15px] flex justify-center ">
          {isArticle && (
            <>
              <div className="bg-white p-[30px] w-[800px]  border border-border rounded-[8px] ">
                <div className="relative">
                  <div
                    className="w-[100%] h-[400px] mx-auto mb-[30px] rounded-[4px] relative bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${isArticle.coverUrl})`,
                    }}
                  />
                  {isArticle.uid === user?.uid && (
                    <Buttons setOpenModal={setOpenModal} articleId={id} />
                  )}
                </div>
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

                <ReactMarkdown
                  children={isArticle.text}
                  className="article-preview"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  //   components={{
                  //     code({ node, inline, className, children, ...props }) {
                  //       const match = /language-(\w+)/.exec(className || '')
                  //       return !inline && match ? (
                  //         <SyntaxHighlighter
                  //           // style={dracula}
                  //           className="SyntaxHighlighter"
                  //           children={String(children).replace(/\n$/, '')}
                  //           language={match[1]}
                  //           PreTag="div"
                  //           {...props}
                  //         />
                  //       ) : (
                  //         <code className={className} {...props}>
                  //           {children}
                  //         </code>
                  //       )
                  //     },
                  //   }}
                />
              </div>

              <LikeComment articleId={id} />
            </>
          )}
        </div>
        <CommentsContainer articleId={id} />
        <Comments articleId={id} />
      </div>
    </>
  )
}
