/* eslint-disable react/react-in-jsx-scope */

import { FiThumbsUp } from 'react-icons/fi'
import { IoChatbubblesOutline } from 'react-icons/io5'

import { Link } from 'react-router-dom'
import { ArticleType } from '../../../lib/types'

type CardProps = ArticleType
export function Card({
  articleId,
  //   uid,
  text,
  title,
  readMin,
  coverUrl,
}: CardProps) {
  return (
    <div className="mx-auto my-[15px] w-[650px] bg-white border border-border p-[30px] rounded-[8px]">
      <div
        className="w-[100%] h-[300px] mx-auto mb-[30px] rounded-[4px] relative bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${coverUrl})`,
        }}
      ></div>
      <Link
        to={`/article/${articleId}`}
        className="text-[30px] font-semibold text-dark"
      >
        {title}
      </Link>
      <br /> <br />
      <Link to={`/article/${articleId}`} className="text-darkGrey">
        {text.substr(0, 185) + '...'}
      </Link>
      <div className="flex justify-between items-baseline mt-[30px]">
        <div className="flex items-center">
          img
          <div>
            Author
            <p>{readMin} read min</p>
          </div>
        </div>

        <div className="flex">
          <Link
            to={`/article/${articleId}`}
            className="mr-[20px] text-[20px] hover:bg-border py-[3px] px-[15px] rounded-[30px] transition ease-in-out duration-200 "
          >
            <FiThumbsUp />
          </Link>
          <Link
            to={`/article/${articleId}`}
            className="  text-[23px] hover:bg-border py-[3px] px-[15px] rounded-[30px] transition ease-in-out duration-200 "
          >
            <IoChatbubblesOutline />
          </Link>
        </div>
      </div>
    </div>
  )
}
