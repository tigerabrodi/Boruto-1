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
import { useAuthContext } from '../../context'
import { ArticleType, firebaseDb, ParamsType, UserType } from '../../lib'
import { Author, LikeComment, Comments, CommentsContainer, Buttons } from '.'
import DeleteArticle from '../../components/modal/DeleteArticle'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function Article() {
  const [users, setUsers] = useState<UserType[] | null>(null)
  const [article, setArticle] = useState<ArticleType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { id } = useParams<ParamsType>()
  const { user } = useAuthContext()

  const articleDocumentRef = doc(
    firebaseDb,
    `articles/${id}`
  ) as DocumentReference<ArticleType>

  useEffect(() => {
    const unsubscribe = onSnapshot(articleDocumentRef, (doc) => {
      const docData = doc.data()
      if (docData) {
        setArticle(docData)
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
        setUsers(
          snapshot.docs.map((doc) => ({ ...doc.data(), profileId: doc.id }))
        )
      })
    }
    getProfile()
  }, [])

  return (
    <>
      {!user?.uid && <InfoModal />}
      {isModalOpen === true && (
        <DeleteArticle
          articleId={id}
          setOpenModal={setIsModalOpen}
          openModal={isModalOpen}
        />
      )}
      <div className="flex flex-col justify-center pb-[50px]">
        <div className="pt-[150px] pb-[15px] flex justify-center ">
          {article && (
            <>
              <div className="bg-white p-[30px] w-[800px]  border border-border rounded-[8px] ">
                <div className="relative">
                  <div
                    className="w-[100%] h-[400px] mx-auto mb-[30px] rounded-[4px] relative bg-no-repeat bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${article.coverUrl})`,
                    }}
                  />
                  {article.uid === user?.uid && (
                    <Buttons setOpenModal={setIsModalOpen} articleId={id} />
                  )}
                </div>
                <h1
                  className="text-[30px] pb-[10px] font-semibold text-center"
                  tabIndex={0}
                >
                  {article.title}
                </h1>
                <h2
                  className="text-[28px] pb-[20px]  text-center text-darkGrey"
                  tabIndex={0}
                >
                  {article.subtitle}
                </h2>

                <div className="flex items-center justify-center mb-[30px]">
                  {users &&
                    users.map((user) => {
                      return (
                        <Author
                          user={user}
                          article={article}
                          key={user.profileId}
                        />
                      )
                    })}
                </div>

                <ReactMarkdown
                  children={article.text}
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
