/* eslint-disable react/react-in-jsx-scope */

import { FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAuthContext, useInfoContext } from '../../context'

export function InfoModal() {
  const { user } = useAuthContext()
  const { popup, setPopup } = useInfoContext()

  return (
    <>
      {popup === true && (
        <>
          {!user?.uid && (
            <div
              onClick={() => setPopup(false)}
              className="bg-[#4141418f] fixed top-[0] left-[0] w-screen h-screen z-20 flex  justify-center"
            >
              <div className="p-[30px] bg-white w-[550px] h-[300px] m-auto rounded-[8px] border border-border relative">
                <h1
                  tabIndex={0}
                  className="font-semibold text-[26px] text-center border-b border-border pb-[15px]"
                >
                  Hey, 👋 sign up or sign in to interact.
                </h1>
                <p tabIndex={0} className="text-[20px] text-center pt-[15px]">
                  This blog is powered by Boruto. We need to authenticate you
                  via Boruto in order for you to interact with the author.
                </p>
                <div className="flex items-center justify-center pt-[30px]">
                  <Link
                    to="/signup"
                    onClick={() => setPopup(false)}
                    className=" transition ease-in-out duration-200 mr-[20px] py-[10px] w-[130px] flex justify-center bg-blue rounded-[30px] text-white hover:bg-hoverFilled"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/signin"
                    onClick={() => setPopup(false)}
                    className=" transition ease-in-out duration-200 ml-[20px] py-[10px] w-[130px] flex justify-center rounded-[30px] text-blue border border-blue hover:bg-hoverOutlined"
                  >
                    Sign in
                  </Link>
                </div>{' '}
                <button
                  className="absolute top-[10px] right-[15px] text-[20px    ]"
                  aria-label="close Modal"
                >
                  <FiX />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
