/* eslint-disable react/react-in-jsx-scope */

import { deleteDoc, doc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { firebaseDb, useLoadingStore } from '../../lib'
import { ButtonProps } from '../../pages/article'

export default function DeleteArticle({
  articleId,
  setOpenModal,
}: ButtonProps) {
  const { setStatus } = useLoadingStore()
  const navigate = useNavigate()

  const deleteArticle = async () => {
    setStatus('loading')
    navigate('/profile')
    const articleDoc = doc(firebaseDb, `articles/${articleId}`)
    await deleteDoc(articleDoc)
    setStatus('success')
    toast.success('Successfully deleted your article.')
    setOpenModal(false)
  }

  return (
    <div
      onClick={() => setOpenModal(false)}
      className="bg-[#4141418f] fixed top-[0] left-[0] w-screen h-screen z-20 flex  justify-center"
    >
      <div className="p-[30px] bg-white w-[550px] h-[250px] m-auto rounded-[8px] border border-border relative">
        <h1
          tabIndex={0}
          className="font-semibold text-[26px] text-center border-b border-border pb-[15px]"
        >
          Are you sure?
        </h1>
        <p tabIndex={0} className="text-[20px] text-center pt-[20px]">
          Do you really want to delete your article?
        </p>
        <div className="flex items-center justify-center pt-[30px]">
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
        >
          <FiX />
        </button>
      </div>
    </div>
  )
}
