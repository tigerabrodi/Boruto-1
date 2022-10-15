/* eslint-disable react/react-in-jsx-scope */
import Menu from '@mui/material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { FiFeather, FiLogOut, FiUser } from 'react-icons/fi'
import {
  firebaseAuth,
  firebaseDb,
  useLoadingStore,
  UserType,
} from '../../../lib'
import { doc, DocumentReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context'
import toast from 'react-hot-toast'

export function Authenticated() {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
  const [isUser, setIsUser] = useState<UserType | null>(null)
  const { setStatus } = useLoadingStore()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const isOpen = Boolean(anchorElement)

  const avatarDocumentRef = doc(
    firebaseDb,
    `users/${user?.uid}`
  ) as DocumentReference<UserType>

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  const handleLogOut = async () => {
    setAnchorElement(null)
    setStatus('loading')
    firebaseAuth.signOut()
    navigate('/')
    toast.success('Successfully signed out of your account.')
    setStatus('success')
  }

  useEffect(
    () =>
      onSnapshot(avatarDocumentRef, (doc) => {
        const docData = doc.data()
        if (docData) {
          setIsUser(docData)
        }
      }),

    [user?.uid]
  )

  return (
    <div>
      {isUser && (
        <>
          <button
            aria-controls={isOpen ? 'authenticated-nav-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-label="authenticated nav menu"
            onClick={handleClick}
          >
            <img src={isUser.avatarUrl} alt="" className="w-14 rounded-[50%]" />
          </button>
          <Menu
            id="authenticated-nav-menu"
            aria-label='"authenticated nav menu"'
            anchorEl={anchorElement}
            open={isOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{ top: '25px' }}
          >
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
              to={`/profiles/${user?.uid}`}
              onClick={handleClose}
              className="w-[250px] transition ease-in-out duration-200 flex align-center text-[18px] px-[30px] py-[20px] hover:bg-border"
            >
              <FiUser className="text-[23px] mr-[10px] self-center" />
              My Profile
            </Link>
            <Link
              to="/articles/create"
              aria-label="New article"
              onClick={handleClose}
              className="transition ease-in-out duration-200 flex align-center text-[18px] px-[30px] py-[20px] hover:bg-border border-b border-border"
            >
              <FiFeather className="text-[23px] mr-[10px] self-center" />
              New Article
            </Link>
            <Link
              to="/"
              onClick={handleLogOut}
              className="transition ease-in-out duration-200 flex align-center text-error text-[18px] px-[30px] py-[20px] hover:bg-border "
            >
              <FiLogOut className="text-[23px] mr-[10px] self-center" />
              Sign Out
            </Link>
          </Menu>
        </>
      )}
    </div>
  )
}
