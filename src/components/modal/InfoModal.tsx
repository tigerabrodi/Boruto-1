/* eslint-disable react/react-in-jsx-scope */

import { Link } from 'react-router-dom'

export function InfoModal() {
  return (
    <div className="bg-[#4141418f] fixed top-[0] left-[0] w-screen h-screen z-20 flex  justify-center">
      <div className="p-[30px] bg-white w-[550px] h-[300px] m-auto rounded-[8px] border border-border">
        <h1 className="font-semibold text-[26px] text-center border-b border-border pb-[15px]">
          Hey, 👋 sign up or sign in to interact.
        </h1>

        <p className="text-[20px] text-center pt-[15px]">
          This blog is powered by Boruto. We need to authenticate you via Boruto
          in order for you to interact with the author.
        </p>

        <div className="flex items-center justify-center pt-[30px]">
          <Link
            to="/signup"
            className=" transition ease-in-out duration-200 mr-[20px] py-[10px] w-[130px] flex justify-center bg-blue rounded-[30px] text-white hover:bg-hoverFilled"
          >
            Sign up
          </Link>
          <Link
            to="/signin"
            className=" transition ease-in-out duration-200 ml-[20px] py-[10px] w-[130px] flex justify-center rounded-[30px] text-blue border border-blue hover:bg-hoverOutlined"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
