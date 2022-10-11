/* eslint-disable react/react-in-jsx-scope */

import { Link } from 'react-router-dom'
import { getDateWithTimestamp, getTimestamp } from '../../../lib/timestamp'
import { HiOutlineBookOpen } from 'react-icons/hi'

type AuthorProps = {
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  profileId: string
  avatarUrl: string
  fullname: string
  PIN: string
  uid: string
  readMin: string
}
export function Author({
  createdAt,
  avatarUrl,
  fullname,
  PIN,
  uid,
  profileId,
  readMin,
}: AuthorProps) {
  return (
    <>
      {uid === PIN && (
        <>
          <img
            src={avatarUrl}
            alt=""
            className="w-[50px] rounded-[50%] mr-[20px]"
          />

          <Link
            className=" text-[18px]  hover:underline"
            to={`/profile/${profileId}`}
          >
            {fullname}
          </Link>
          <p className="mx-[15px] text-[20px] text-darkGrey ">·</p>

          <p className=" flex items-center text-[18px] text-darkGrey">
            {getDateWithTimestamp(getTimestamp(createdAt))}
          </p>
          <p className="mx-[15px] text-[20px] text-darkGrey ">·</p>
          <p className="flex items-center text-[18px] text-darkGrey ">
            <HiOutlineBookOpen className="text-[20px] mr-[5px]" />
            {readMin} read min
          </p>
        </>
      )}
    </>
  )
}
