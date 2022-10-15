/* eslint-disable react/react-in-jsx-scope */

import { Link } from 'react-router-dom'
import { getDateWithTimestamp, getTimestamp } from '../../../lib'
import { HiOutlineBookOpen } from 'react-icons/hi'

type AuthorProps = {
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  profileId: string
  avatarUrl: string
  fullname: string
  pin: string
  uid: string
  readMin: string
}
export function Author({
  createdAt,
  avatarUrl,
  fullname,
  pin,
  uid,
  profileId,
  readMin,
}: AuthorProps) {
  return (
    <>
      {uid === pin && (
        <>
          <img
            src={avatarUrl}
            alt=""
            className="w-[50px] rounded-[50%] mr-[20px]"
          />

          <Link
            className=" text-[18px]  hover:underline"
            to={`/profiles/${profileId}`}
          >
            {fullname}
          </Link>
          <p className="mx-[15px] text-[20px] text-darkGrey">·</p>

          <p
            className=" flex items-center text-[18px] text-darkGrey"
            tabIndex={0}
          >
            {getDateWithTimestamp(getTimestamp(createdAt))}
          </p>
          <p className="mx-[15px] text-[20px] text-darkGrey ">·</p>
          <p
            className="flex items-center text-[18px] text-darkGrey "
            tabIndex={0}
            aria-label={`${readMin} read minutes`}
          >
            <HiOutlineBookOpen className="text-[20px] mr-[5px]" />
            {readMin} read min
          </p>
        </>
      )}
    </>
  )
}
