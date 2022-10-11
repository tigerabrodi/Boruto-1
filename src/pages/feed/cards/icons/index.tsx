/* eslint-disable react/react-in-jsx-scope */
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { firebaseDb, LikeType } from '../../../../lib'

type IconsProps = {
  articleId: string
}
export function Icons({ articleId }: IconsProps) {
  const [likes, setLikes] = useState<LikeType[]>([])

  const likesCollectionReference = collection(
    firebaseDb,
    `articles/${articleId}/likes`
  ) as CollectionReference<LikeType>

  useEffect(() => {
    const unsubscribe = onSnapshot(likesCollectionReference, (snapshot) =>
      setLikes(snapshot.docs.map((doc) => ({ ...doc.data() })))
    )

    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <div className="flex items-center">
      <Link
        to={`/article/${articleId}`}
        aria-label="Go to article"
        className="text-lightGrey mr-[20px] text-[21px] hover:bg-border   px-[15px] rounded-[30px] transition ease-in-out duration-200 flex items-center"
      >
        <FiThumbsUp className="mr-[5px]" />{' '}
        {likes?.length > 0 && <span className="mt-[3px]">{likes?.length}</span>}
      </Link>
      <Link
        to={`/article/${articleId}`}
        className="text-lightGrey  text-[25px] hover:bg-border py-[3px] px-[15px] rounded-[30px] transition ease-in-out duration-200 "
      >
        <IoChatbubblesOutline />
      </Link>
    </div>
  )
}
