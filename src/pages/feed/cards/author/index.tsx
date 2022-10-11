/* eslint-disable react/react-in-jsx-scope */
import { HiOutlineBookOpen } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { getDateWithTimestamp, getTimestamp } from '../../../../lib'

type AuthorProps = {
  timestamp: {
    seconds: number
    nanoseconds: number
  }
  profileId: string
  avatarUrl: string
  fullname: string
  readMin: string
  uid: string
  pin: string
}

export function Author({
  timestamp,
  profileId,
  avatarUrl,
  fullname,
  readMin,
  pin,
  uid,
}: AuthorProps) {
  return (
    <>
      {uid === pin && (
        <div className="flex items-center">
          <img src={avatarUrl} alt="" className="w-[55px] rounded-[50%]" />
          <div className="ml-[10px]">
            <Link
              to={`/profile/${profileId}`}
              className="font-semibold mb-[3px] hover:underline"
            >
              {fullname}
            </Link>
            <p className="text-darkGrey flex items-center">
              <HiOutlineBookOpen className="text-[20px] mr-[5px]" />
              {readMin} read min
            </p>
            <p className=" flex items-center text-[18px] text-darkGrey">
              {getDateWithTimestamp(getTimestamp(timestamp))}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
