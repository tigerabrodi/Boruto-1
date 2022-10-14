/* eslint-disable react/react-in-jsx-scope */

import { FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import { useInfoContext } from '../../context'

export function InfoModal() {
  const { popup, setPopup } = useInfoContext()

  return (
    <>
      {popup === true && (
        <Dialog
          open={popup}
          onClose={() => setPopup(false)}
          className="relative"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <h1
            tabIndex={0}
            className="font-semibold text-[26px] text-center border-b border-border pb-[15px] p-[30px]"
          >
            Hey, 👋 sign up or sign in to interact.
          </h1>
          <p
            tabIndex={0}
            className="text-[20px] text-center pt-[15px] px-[30px]"
          >
            This blog is powered by Boruto. We need to authenticate you via
            Boruto in order for you to interact with the author.
          </p>
          <div className="flex items-center justify-center p-[30px] ">
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
            className="absolute top-[10px] right-[15px] text-[20px]"
            onClick={() => setPopup(false)}
            aria-label="close Modal"
          >
            <FiX />
          </button>
        </Dialog>
      )}
    </>
  )
}
