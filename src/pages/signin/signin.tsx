/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useFormState, useSignInWithEmailAndPassword } from '../../hooks/'

export default function Signin() {
  const [passwordShown, setPasswordShown] = useState(false)

  const { isSignInError, signInWithEmailAndPassword } =
    useSignInWithEmailAndPassword()

  const {
    handleChange,
    formState: { password, email },
  } = useFormState({
    password: '',
    email: '',
  })

  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setPasswordShown(!passwordShown)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    signInWithEmailAndPassword(email, password)
  }

  return (
    <div className=" h-screen flex justify-center align-center ">
      <form
        className="m-auto p-[30px] bg-white border border-border rounded-[5px] flex-col w-[450px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-dark text-center text-[30px] font-semibold border-b border-border pb-[15px]">
          Sign In
        </h1>
        {isSignInError && (
          <p className="mt-[30px] text-error text-center" role="alert">
            Password or email is invalid.
          </p>
        )}
        <div className="flex flex-col mt-[30px]">
          <label htmlFor="email" className="mb-[5px] ml-[5px]">
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            aria-required="true"
            value={email}
            className="border border-border py-[6px] px-[12px] rounded-[30px] "
          />
        </div>

        <div className="flex flex-col mt-[30px]">
          <label htmlFor="Password" className="mb-[5px] ml-[5px]">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordShown ? 'text' : 'password'}
              name="password"
              id="Password"
              onChange={handleChange}
              aria-required="true"
              value={password}
              className="border border-border py-[6px] px-[12px] rounded-[30px] w-[100%]"
            />
            <button
              onClick={togglePassword}
              className="absolute top-[10px] right-[20px] text-lightGrey"
            >
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className=" cursor-pointer w-[100%] transition ease-in-out duration-200 mt-[40px] mb-[30px] py-[10px] px-[30px] bg-blue rounded-[30px] text-white hover:bg-hoverFilled"
        >
          Sign in
        </button>
        <p className="text-center">
          Do not have an account yet?{' '}
          <Link className="text-blue" to="/signup">
            Sign up.
          </Link>
        </p>
      </form>
    </div>
  )
}
