/* eslint-disable react/react-in-jsx-scope */

import { deleteDoc, doc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { firebaseDb, useLoadingStore } from '../../lib'

import Dialog from '@mui/material/Dialog'
import { Dispatch, SetStateAction } from 'react'
import { useAuthContext } from '../../context'
import { FiX } from 'react-icons/fi'

type DeleteArticleProps = {
  articleId: string | undefined
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function DeleteArticle({
  articleId,
  setOpenModal,
  openModal,
}: DeleteArticleProps) {
  const { user } = useAuthContext()
  const { setStatus } = useLoadingStore()
  const navigate = useNavigate()

  const deleteArticle = async () => {
    setStatus('loading')
    navigate(`/profile/${user?.uid}`)
    const articleDoc = doc(firebaseDb, `articles/${articleId}`)
    await deleteDoc(articleDoc)
    setStatus('success')
    toast.success('Successfully deleted your article.')
    setOpenModal(false)
  }

  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      className="relative"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <h1
        id="alert-dialog-title"
        tabIndex={0}
        className="font-semibold text-[26px] text-center border-b border-border pb-[15px] p-[30px]"
      >
        Are you sure?{' '}
      </h1>
      <p
        id="alert-dialog-description"
        className="text-[20px] text-center pt-[20px] px-[30px]"
      >
        Do you really want to delete your article?
      </p>
      <div className="flex items-center justify-center py-[30px]">
        <button
          onClick={deleteArticle}
          className=" transition ease-in-out duration-200 mr-[20px] py-[10px] w-[120px] flex justify-center bg-blue rounded-[30px] text-white hover:bg-hoverFilled"
        >
          Yes
        </button>
        <button
          onClick={() => setOpenModal(false)}
          className=" transition ease-in-out duration-200 ml-[20px] py-[10px] w-[120px] flex justify-center rounded-[30px] text-blue border border-blue hover:bg-hoverOutlined"
        >
          No
        </button>
      </div>
      <button
        className="absolute top-[10px] right-[15px] text-[20px]"
        onClick={() => setOpenModal(false)}
        aria-label="close Modal"
      ></button>
      <button
        aria-label="close modal"
        className="absolute top-[10px] right-[10px]"
        onClick={() => setOpenModal(false)}
      >
        <FiX />
      </button>
    </Dialog>
  )
}
