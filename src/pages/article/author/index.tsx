/* eslint-disable react/react-in-jsx-scope */

import { Link } from 'react-router-dom'
import {
  ArticleType,
  getDateWithTimestamp,
  getTimestamp,
  UserType,
} from '../../../lib'
import { HiOutlineBookOpen } from 'react-icons/hi'

type AuthorProps = {
  article: ArticleType
  user: UserType
}
export function Author({
  article: { uid, readMin },
  user: { pin, avatarUrl, profileId, fullname, createdAt },
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
