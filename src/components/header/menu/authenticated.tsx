/* eslint-disable react/react-in-jsx-scope */

import { Link } from 'react-router-dom'
import { FiLogOut, FiUser, FiFeather } from 'react-icons/fi'
import { useAuthContext } from '../../../context/AuthContext'
import { firebaseDb } from '../../../lib/firebase'
import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { useState } from 'react'

export default function Authenticated() {
  const [isUser, setIsUser] = useState<DocumentData>()

  const { user } = useAuthContext()

  const avatarDocumentReference = doc(firebaseDb, `users/${user?.uid}`)

  onSnapshot(avatarDocumentReference, (doc) => {
    setIsUser(doc.data())
  })

  return (
    <div
      role="nav"
      aria-label="authenticated menu"
      className="absolute right-[30px] top-[90px] bg-white  rounded-[5px] border border-border shadow-md"
    >
      {isUser && (
        <>
          <div className="flex p-[30px] ">
            <img
              src={isUser.avatarUrl}
              alt="Your profile picture"
              className="w-[65px] rounded-[50%]"
            />
            <div className="ml-[10px] self-center	">
              <p className="font-semibold ">{isUser.fullname} </p>
              <p className="text-[14px] text-darkGrey">@{isUser.username} </p>
            </div>{' '}
          </div>
          <Link
            className="transition ease-in-out duration-200 flex align-center text-[18px] px-[30px] py-[20px] hover:bg-border"
            to="/profile"
          >
            <FiUser className="text-[23px] mr-[10px] self-center" /> My Profile
          </Link>
          <Link
            to="/article/create"
            className="transition ease-in-out duration-200 flex align-center text-[18px] px-[30px] py-[20px] hover:bg-border border-b border-border"
          >
            <FiFeather className="text-[23px] mr-[10px] self-center" /> New
            Article
          </Link>
          <Link
            className="transition ease-in-out duration-200 flex align-center text-error text-[18px] px-[30px] py-[20px] hover:bg-border "
            to="/"
          >
            <FiLogOut className="text-[23px] mr-[10px] self-center" />
            Log Out
          </Link>
        </>
      )}
    </div>
  )
}
