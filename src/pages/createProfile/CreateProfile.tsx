/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import toast from 'react-hot-toast'
import { ChangeEvent, useRef, useState } from 'react'

import { updateDoc, doc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

import { useFormState } from '../../hooks/'
import { useNavigate } from 'react-router-dom'
import { IoCameraOutline } from 'react-icons/io5'

import {
  firebaseDb,
  firebaseAuth,
  firebaseStorage,
  useLoadingStore,
} from '../../lib/'

export default function CreateProfile() {
  // TODO: use label for triggering input file instead of button with ref.
  const filePickerRef = useRef<any>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { setStatus } = useLoadingStore()

  const {
    handleChange,
    formState: { name, age, bio, location },
  } = useFormState({
    name: '',
    age: '',
    bio: '',
    location: '',
  })

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setStatus('loading')

    if (loading) return setLoading(true)

    const imageReference = ref(
      firebaseStorage,
      `avatars/${firebaseAuth.currentUser?.uid}/image`
    )

    await uploadString(imageReference, selectedFile, 'data_url').then(
      async () => {
        const downloadURL = await getDownloadURL(imageReference)

        await updateDoc(
          doc(firebaseDb, `users/${firebaseAuth.currentUser?.uid}`),
          {
            age: age,
            bio: bio,
            location: location,
            fullname: name,
            avatarUrl: downloadURL,
          }
        )
      }
    )

    setLoading(false)
    setSelectedFile(null)
    setStatus('success')
    navigate(`/`)
    toast.success('Successfully created your account.')
  }

  const addImageToPost = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()

    const file = event.target.files?.[0]
    if (file) {
      reader.readAsDataURL(file)
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result)
    }
  }

  return (
    <div className=" h-screen flex justify-center align-center pt-[100px]">
      <form
        className="m-auto p-[30px] bg-white border border-border rounded-[5px] flex-col w-[450px]"
        onSubmit={handleSubmit}
      >
        <h1
          tabIndex={0}
          className="text-dark text-center mx-auto  text-[30px] font-semibold border-b border-border pb-[15px]"
        >
          Create your account
        </h1>
        {selectedFile ? (
          <button
            tabIndex={0}
            aria-label="Change your profile picture"
            className="mx-auto my-[30px] flex"
            onClick={() => setSelectedFile(null)}
          >
            <img
              src={selectedFile}
              className="rounded-[50%]  mx-auto w-[100px]   "
            />
          </button>
        ) : (
          <div
            tabIndex={0}
            role="input"
            aria-label="Select your profile picture"
            className="mx-auto my-[30px] "
            onClick={() => filePickerRef.current.click()}
          >
            <label htmlFor="fileupload">
              <IoCameraOutline
                tabIndex={-1}
                className="cursor-pointer rounded-[50%] p-[20px] mx-auto text-blue text-[100px] bg-[#a8bdff]"
              />
            </label>

            <input
              type="file"
              name="file"
              id="fileupload"
              ref={filePickerRef}
              accept="image/jpeg, image/png"
              aria-label="Choose File"
              onChange={addImageToPost}
              hidden
            />
          </div>
        )}

        <div className="flex justify-between">
          <div className="flex flex-col   ">
            <label htmlFor="Full Name" className="mb-[5px] ml-[5px]">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              id="Full Name"
              onChange={handleChange}
              value={name}
              className="border border-border py-[6px] px-[12px] rounded-[30px] w-[250px] "
            />
          </div>
          <div className="flex flex-col  ">
            <label htmlFor="Age" className="mb-[5px] ml-[5px]">
              Age *
            </label>

            <input
              type="number"
              name="age"
              id="Age"
              onChange={handleChange}
              value={age}
              className="border border-border py-[6px] px-[12px] rounded-[30px]  w-[100px]  "
            />
          </div>
        </div>

        <div className="flex flex-col mt-[30px]">
          <label className="mb-[5px] ml-[5px]" htmlFor="location">
            Location *
          </label>

          <input
            type="text"
            name="location"
            id="location"
            onChange={handleChange}
            value={location}
            className="border border-border py-[6px] px-[12px] rounded-[30px] "
          />
        </div>

        <div className="flex flex-col mt-[30px]">
          <label className="mb-[5px] ml-[5px]" htmlFor="Biography">
            Tell us about what you do *
          </label>

          <textarea
            name="bio"
            id="Biography"
            aria-label="Biography"
            onChange={handleChange}
            value={bio}
            className="border border-border py-[10px] px-[20px] rounded-[30px] w-[380px] h-[150px]"
          />
        </div>
        <button
          type="submit"
          aria-label="Done"
          tabIndex={0}
          className=" cursor-pointer w-[100%]	 transition ease-in-out duration-200 mt-[40px]   py-[10px] px-[30px] bg-blue rounded-[30px] text-white hover:bg-hoverFilled"
          onClick={handleSubmit}
        >
          {loading ? 'Done...' : 'Done'}
        </button>
      </form>
    </div>
  )
}
