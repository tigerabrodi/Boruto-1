/* eslint-disable react/react-in-jsx-scope */

import {
  doc,
  DocumentData,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../../../context'
import { firebaseDb, useLoadingStore } from '../../../lib'
import { v4 } from 'uuid'
import { T } from '.'

export function Textarea({ articleId }: T) {
  const uuid = v4()
  const { user } = useAuthContext()

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const { setStatus } = useLoadingStore()
  const [commentField, setCommentField] = useState('')

  const [profile, setProfile] = useState<DocumentData>()
  const avatarDocumentReference = doc(firebaseDb, `users/${user?.uid}`)

  const sendComment = async () => {
    setStatus('loading')

    const commentsCollectionReference = doc(
      firebaseDb,
      `articles/${articleId}/comments/${uuid} `
    )

    setCommentField('')
    await setDoc(commentsCollectionReference, {
      comment: commentField,
      timestamp: serverTimestamp(),
      commentUid: user?.uid,
    })
    setStatus('success')
    toast.success('You successfully added a comment to this article')

    if (textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.value = ''
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(avatarDocumentReference, (doc) => {
      setProfile(doc.data())
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="w-[800px] bg-white border border-border rounded-[8px]">
      {profile && (
        <div className="flex items-center p-[30px] border-b border-border">
          <img
            src={profile.avatarUrl}
            alt="Your profile picture"
            className="rounded-[50%] w-[60px]"
          />
          <div className="ml-[15px]">
            <p className="font-semibold">{profile.fullname}</p>
            <p className="text-darkGrey ] pt-[3px]">
              {profile.bio.substr(0, 85) + '...'}
            </p>
          </div>
        </div>
      )}
      <label htmlFor="Comment"></label>
      <textarea
        name="Comment"
        id="Comment"
        ref={textareaRef}
        className="w-[100%] h-[250px] resize-none p-[30px] text-[18px] leading-[2] border-b border-border"
        placeholder="Write your comment here..."
        onChange={(event) => setCommentField(event.target.value)}
      />
      <button
        onClick={sendComment}
        className="my-[20px] mx-auto flex justify-center  text-blue border border-blue py-[6px] w-[120px] rounded-[30px] hover:bg-hoverOutlined transition ease-in-out duration-200 "
      >
        Post
      </button>
    </div>
  )
}
