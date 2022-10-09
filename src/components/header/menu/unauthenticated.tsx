/* eslint-disable react/react-in-jsx-scope */

import { Link } from 'react-router-dom'
import { DEFAULT_AVATAR } from '../avatar'

export function Unauthenticated() {
  return (
    <div className="absolute right-[30px] top-[102px] bg-white p-[30px] rounded-[5px] border border-border shadow-md">
      <img src={DEFAULT_AVATAR} alt="" className="w-20 mb-[15px] mx-auto" />
      <p
        className="w-[250px] text-[24px] font-semibold text-dark  mb-[15px] center"
        tabIndex={0}
      >
        Sign up or log in to your Boruto account.
      </p>
      <p className="text-darkGrey mb-[20px]" tabIndex={0}>
        Takes less than a few seconds.
      </p>

      <div className="flex justify-between">
        <Link
          className=" transition ease-in-out duration-200 py-[10px] px-[30px] bg-blue rounded-[30px] text-white hover:bg-hoverFilled"
          to="/signup"
        >
          Sign up
        </Link>
        <Link
          className=" transition ease-in-out duration-200 py-[10px] px-[30px] rounded-[30px] text-blue border border-blue hover:bg-hoverOutlined"
          to="/signup"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
