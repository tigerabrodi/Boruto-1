/* eslint-disable react/react-in-jsx-scope */
import { HiOutlineBookOpen } from 'react-icons/hi'

type AuthorProps = {
  avatarUrl: string
  fullname: string
  readMin: string
  uid: string
  PIN: string
}

export function Author({
  avatarUrl,
  fullname,
  readMin,
  uid,
  PIN,
}: AuthorProps) {
  return (
    <>
      {PIN === uid && (
        <div className="flex items-center">
          <img src={avatarUrl} alt="" className="w-[55px] rounded-[50%]" />
          <div className="ml-[10px]">
            <p className="font-semibold mb-[3px]">{fullname}</p>
            <p className="text-darkGrey flex items-center">
              <HiOutlineBookOpen className="text-[20px] mr-[5px]" />
              {readMin} read min
            </p>
          </div>
        </div>
      )}
    </>
  )
}
