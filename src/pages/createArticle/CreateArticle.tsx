/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */

import {
  updateDoc,
  doc,
  serverTimestamp,
  addDoc,
  collection,
} from 'firebase/firestore'
import { useRef, useState } from 'react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { FiX } from 'react-icons/fi'
import { RiText } from 'react-icons/ri'
import { IoImageOutline } from 'react-icons/io5'

import { useAuthContext } from '../../context/'
import { firebaseDb, firebaseStorage, useLoadingStore } from '../../lib/'
import { Preview } from './preview'
// import { Preview } from './preview/preview'

export default function CreateArticle() {
  const [isSubtitle, setIsSubtitle] = useState(false)
  const [selectedFiled, setSelectedField] = useState<any>(null)
  const [subtitleField, setSubtitleField] = useState('')
  const [textField, setTextField] = useState('')
  const [titleField, setTitleField] = useState('')
  const [minuteField, setMinuteField] = useState('')

  // TODO: Don't use, and use a label instead of button to trigger file input.
  const filePickerRef = useRef<any>(null)

  const { setStatus } = useLoadingStore()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const closeSubtitleField = () => {
    setIsSubtitle(false)
    setSubtitleField('')
  }

  const createBlogArticle = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setStatus('loading')

    const documentReference = await addDoc(collection(firebaseDb, 'articles'), {
      timestamp: serverTimestamp(),
      id: user?.uid,
    })

    const imageReference = ref(
      firebaseStorage,
      `articles/${documentReference.id}/image`
    )

    await uploadString(imageReference, selectedFiled, 'data_url').then(
      async () => {
        const downloadURL = await getDownloadURL(imageReference)

        await updateDoc(doc(firebaseDb, `articles/${documentReference.id}`), {
          title: titleField,
          subtitle: subtitleField,
          text: textField,
          coverUrl: downloadURL,
          readMin: minuteField,
          uid: user?.uid,
        })
      }
    )

    setStatus('success')
    setSelectedField(null)
    navigate('/')
    toast.success('Successfully created a blog article.')
  }

  const addImageToPost = (e: any) => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedField(readerEvent.target?.result)
    }
  }

  return (
    <div className="h-auto py-[120px] flex flex-col">
      <div className="w-[800px] h-[100%] rounded-[8px] border border-border bg-white mx-auto">
        <div className="flex p-[20px] justify-between items-center">
          <div className="flex">
            <button
              role="file input"
              aria-label="Add a cover to your blog article"
              onClick={() => filePickerRef.current.click()}
              className="flex items-center text-[15px] rounded-[30px] py-[8px] px-[12px] border border-border text-darkGrey transition ease-in-out duration-200 hover:bg-border"
            >
              <IoImageOutline className="text-[20px] mr-[5px]" /> Add Cover
            </button>
            <input
              aria-label="Add cover"
              type="file"
              name="file"
              ref={filePickerRef}
              onChange={addImageToPost}
              className="opacity-0 absolute"
            />

            <button
              onClick={() => setIsSubtitle(true)}
              aria-label="Add subtitle"
              className="z-[2] flex items-center text-[15px] rounded-[30px] ml-[10px] py-[8px] px-[12px] border border-border text-darkGrey transition ease-in-out duration-200 hover:bg-border"
            >
              <RiText className="text-[20px] mr-[5px]" /> Add Subtitle
            </button>
          </div>
          <div className="flex items-baseline">
            <label htmlFor="Read minute" className="absolute opacity-0">
              Read minute
            </label>
            <input
              type="number"
              name="Read Minute"
              id="Read minute"
              placeholder="0"
              onChange={(event) => setMinuteField(event?.target.value)}
              className="z-[2] placeholder-darkGrey text-center text-darkGrey flex items-center w-[30px] border-b border-border  "
            />
            <span className="pl-[10px] border-b border-border text-darkGrey">
              min read
            </span>
          </div>
        </div>

        {selectedFiled ? (
          <div
            className="w-[750px] h-[375px] mx-auto mb-[30px] rounded-[8px] relative bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${selectedFiled})`,
            }}
          >
            <button
              aria-label="Remove image"
              onClick={() => setSelectedField(null)}
              className="absolute bg-[#ffffffda] top-[15px] right-[30px] text-[20px] py-[5px] px-[15px] rounded-[4px] transition ease-in-out duration-200  hover:bg-white"
            >
              <FiX />
            </button>
          </div>
        ) : (
          ''
        )}

        <div className="flex flex-col px-[30px]">
          <label htmlFor="Article Title" className="opacity-0 absolute">
            Article Title
          </label>
          <textarea
            name="title"
            id="Article Title"
            placeholder="Article title..."
            onChange={(event) => setTitleField(event.target.value)}
            className="z-[2] font-semibold h-[100px] text-[36px]   text-dark resize-none"
          />
        </div>
        {isSubtitle === true && (
          <div className="flex mt-[-10px] flex-col px-[30px] relative">
            <button
              onClick={closeSubtitleField}
              aria-label="Remove cover"
              className="flex absolute text-darkGrey text-[20px] top-[10px] right-[20px] py-[5px] px-[10px] rounded-[15px]"
            >
              <FiX />
            </button>
            <label htmlFor="Article subtitle" className="opacity-0 absolute">
              Article subtitle
            </label>
            <textarea
              name="title"
              id="Article subtitle"
              placeholder="Article subtitle..."
              onChange={(event) => setSubtitleField(event.target.value)}
              className="  h-[100px] text-[30px] placeholder-darkGrey text-darkGrey resize-none"
            />
          </div>
        )}

        <div className="p-[1px] border-t border-border"></div>

        <div className="flex flex-col">
          <label htmlFor="Article text" className="opacity-0 absolute">
            Article text
          </label>
          <textarea
            name="text"
            id="Article text"
            placeholder="Tell your story..."
            onChange={(event) => setTextField(event.target.value)}
            className="h-[250px] font-[400] text-darkGrey px-[30px] py-[15px] break-words leading-[2]  resize-none"
          />
          <div className="p-[1px] border-t border-border"></div>
          {textField === '' ? (
            <div className="flex h-[250px] text-darkGrey m-auto   items-center  ">
              Nothing to preview! 🌵
            </div>
          ) : (
            <Preview textField={textField} />
          )}
        </div>
      </div>

      <div className="mt-[50px] mx-auto">
        <button
          onClick={createBlogArticle}
          disabled={titleField === '' || textField === '' || minuteField === ''}
          className="w-[150px] mx-[30px] py-[12px] text-center cursor-pointer rounded-[30px] bg-blue text-white transition ease-in-out duration-200 hover:bg-hoverFilled"
        >
          Publish
        </button>
        <button className="w-[150px] mx-[30px] py-[12px] text-center cursor-pointer rounded-[30px] border border-blue text-blue transition ease-in-out duration-200 hover:bg-hoverOutlined">
          cancel
        </button>
      </div>
    </div>
  )
}
