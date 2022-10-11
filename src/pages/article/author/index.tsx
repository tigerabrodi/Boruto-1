/* eslint-disable react/react-in-jsx-scope */

import { Link } from 'react-router-dom'

type AuthorProps = {
  profileId: string
  avatarUrl: string
  fullname: string
  PIN: string
  uid: string
}
export function Author({
  avatarUrl,
  fullname,
  PIN,
  uid,
  profileId,
}: AuthorProps) {
  return (
    <>
      {uid === PIN && (
        <>
          <img
            src={avatarUrl}
            alt=""
            className="w-[55px] rounded-[50%] mr-[20px]"
          />
          <Link
            className=" text-[18px] mr-[30px] hover:underline"
            to={`/profile/${profileId}`}
          >
            {fullname}
          </Link>
        </>
      )}
    </>
  )
}
