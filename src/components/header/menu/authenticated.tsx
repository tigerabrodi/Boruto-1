/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogOut, FiUser, FiFeather } from 'react-icons/fi'
import { useAuthContext, useMenuContext } from '../../../context'
import { firebaseAuth, firebaseDb, useLoadingStore } from '../../../lib'
import { doc, DocumentData, onSnapshot } from 'firebase/firestore'

export function Authenticated() {
  const [isUser, setIsUser] = useState<DocumentData>()
  const { setIsOpen } = useMenuContext()
  const { setStatus } = useLoadingStore()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const avatarDocumentReference = doc(firebaseDb, `users/${user?.uid}`)

  onSnapshot(avatarDocumentReference, (doc) => {
    setIsUser(doc.data())
  })

  const handleLogOut = async () => {
    setIsOpen(false)
    setStatus('loading')
    firebaseAuth.signOut()
    navigate('/')
    toast.success('Successfully signed out of your account.')
    setStatus('success')
  }

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
            onClick={() => setIsOpen(false)}
            className="transition ease-in-out duration-200 flex align-center text-[18px] px-[30px] py-[20px] hover:bg-border"
            to="/profile"
          >
            <FiUser className="text-[23px] mr-[10px] self-center" /> My Profile
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/article/create"
            className="transition ease-in-out duration-200 flex align-center text-[18px] px-[30px] py-[20px] hover:bg-border border-b border-border"
          >
            <FiFeather className="text-[23px] mr-[10px] self-center" /> New
            Article
          </Link>
          <Link
            onClick={handleLogOut}
            className="transition ease-in-out duration-200 flex align-center text-error text-[18px] px-[30px] py-[20px] hover:bg-border "
            to="/"
          >
            <FiLogOut className="text-[23px] mr-[10px] self-center" />
            Sign Out
          </Link>
        </>
      )}
    </div>
  )
}
