/* eslint-disable react/react-in-jsx-scope */

import { Link } from 'react-router-dom'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { getDateWithTimestamp, getTimestamp } from '../../../lib'
import { Details } from '..'

type ArticleProps = {
  pin: string
  uid: string
  title: string
  readMin: string
  coverUrl: string
  articleId: string
  timestamp: {
    seconds: number
    nanoseconds: number
  }
}

export default function Article({
  pin,
  timestamp,
  articleId,
  uid,
  title,
  readMin,
  coverUrl,
}: ArticleProps) {
  return (
    <>
      {uid === pin && (
        <div className="w-[390px] bg-white border border-border p-[15px] rounded-[8px] mt-[20px]  mx-auto ">
          <div>
            <div
              className="w-[100%] h-[200px] mx-auto mb-[10px] rounded-[4px] relative bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(${coverUrl})`,
              }}
            />
            <Link
              to={`/articles/${articleId}`}
              className="text-[20px]  font-semibold hover:underline"
            >
              {title}
            </Link>
            <div className="flex items-end justify-between">
              <div className="mt-[10px]">
                <p className="text-[15px] text-darkGrey  ">
                  {getDateWithTimestamp(getTimestamp(timestamp))}
                </p>
                <p className="text-[15px] text-darkGrey flex items-center">
                  <HiOutlineBookOpen className="text-[17px] mr-[5px]" />
                  {readMin} read min
                </p>
              </div>
              <Details articleId={articleId} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
