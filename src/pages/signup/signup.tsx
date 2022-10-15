/* eslint-disable react/react-in-jsx-scope */
import { functionsDebounce } from 'all-of-just'
import { doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import { useCreateUserWithEmailAndPassword, useFormState } from '../../hooks/'
import { firebaseDb, useLoadingStore } from '../../lib/'

export default function Signp() {
  const [isUsernameError, setIsUsernameError] = useState(false)
  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [isEmailError, setIsEmailError] = useState(false)
  const [isEmailTaken, setIsEmailTaken] = useState(false)
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)

  const { createUserWithEmailAndPassword, signUpError } =
    useCreateUserWithEmailAndPassword()

  const navigate = useNavigate()
  const { setStatus } = useLoadingStore()

  const togglePassword = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setPasswordShown(!passwordShown)
  }

  const {
    handleChange,
    formState: { username, password, confirmPassword, email },
  } = useFormState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  })

  const isAnyFieldEmpty =
    !username.length ||
    !password.length ||
    !confirmPassword.length ||
    !email.length

  const canUserSignUp = () => {
    const isPasswordTooShort = password.length < 6
    if (isPasswordTooShort) {
      setIsPasswordError(true)
      return setTimeout(() => {
        setIsPasswordError(false)
      }, 3000)
    }

    const isPasswordNotMatching = password !== confirmPassword
    if (isPasswordNotMatching) {
      setIsConfirmPasswordError(true)
      return setTimeout(() => {
        setIsConfirmPasswordError(false)
      }, 3000)
    }

    if (isEmailInvalid) {
      setIsEmailError(true)
      return setTimeout(() => {
        setIsEmailError(false)
      }, 3000)
    }
    navigate('/profiles/create')
    return true
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setIsEmailTaken(false)
    setIsEmailError(false)

    if (canUserSignUp() === true) {
      createUserWithEmailAndPassword(email, password, username)
    }
  }

  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    functionsDebounce(async (username: string) => {
      if (username.length >= 3) {
        // setStatus('loading')

        const usernameDocRef = doc(firebaseDb, `usernames/${username}`)
        const usernameDocSnapshot = await getDoc(usernameDocRef)
        const usernameAlreadyExists = usernameDocSnapshot.exists()
        setStatus('success')

        if (usernameAlreadyExists) {
          setIsUsernameValid(false)
          setIsUsernameError(true)
        } else {
          setIsUsernameError(false)
          setIsUsernameValid(true)
        }
      }
    }, 500),
    []
  )

  useEffect(() => {
    checkUsername(username)
  }, [checkUsername, username])

  useEffect(() => {
    if (signUpError && signUpError.code === 'auth/email-already-in-use') {
      setIsEmailError(false)
      setIsEmailTaken(true)
      setTimeout(() => {
        setIsEmailTaken(false)
      }, 3000)
    }
  }, [signUpError])

  return (
    <div className=" h-screen flex justify-center align-center ">
      <form
        className="m-auto p-[30px] bg-white border border-border rounded-[5px] flex-col w-[450px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-dark text-center text-[30px] font-semibold border-b border-border pb-[15px]">
          Sign Up
        </h1>
        <div className="flex flex-col mt-[30px]">
          <label htmlFor="Username" className="mb-[5px] ml-[5px]">
            Username
          </label>
          <input
            id="Username"
            name="username"
            type="text"
            value={username}
            aria-invalid={isUsernameError ? 'true' : 'false'}
            onChange={handleChange}
            aria-required="true"
            className="border border-border py-[6px] px-[12px] rounded-[30px] "
          />

          {isUsernameError && (
            <p className="mt-[10px] text-error text-center" role="alert">
              Username is already taken.
            </p>
          )}
          {isUsernameValid && (
            <p
              className="mt-[10px] text-success text-center"
              role="alert success"
            >
              Username is valid.
            </p>
          )}
        </div>
        <div className="flex flex-col mt-[30px]">
          <label htmlFor="Email" className="mb-[5px] ml-[5px]">
            Email
          </label>
          <input
            id="Email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
              handleChange(event)
              setIsEmailInvalid(!event.target.validity.valid)
            }}
            className="border border-border py-[6px] px-[12px] rounded-[30px] "
            aria-invalid={isEmailError ? 'true' : 'false'}
            aria-required="true"
          />
          {isEmailError && (
            <p className="mt-[10px] text-error text-center" role="alert">
              Email is not valid.
            </p>
          )}
          {isEmailTaken && (
            <p className="mt-[10px] text-error text-center" role="alert">
              Email is already taken.
            </p>
          )}
        </div>

        <div className="flex flex-col mt-[30px]">
          <label className="mb-[5px] ml-[5px]" htmlFor="Password">
            Password
          </label>
          <div className="relative">
            <input
              id="Password"
              name="password"
              type={passwordShown ? 'text' : 'password'}
              value={password}
              onChange={handleChange}
              aria-invalid={isPasswordError ? 'true' : 'false'}
              aria-required="true"
              className="border border-border py-[6px] px-[12px] rounded-[30px] w-[100%]"
            />
            {isPasswordError && (
              <p className="mt-[10px] text-error text-center" role="alert">
                Password must be at least 6 characters.
              </p>
            )}
            <button
              className="absolute top-[10px] right-[20px] text-lightGrey"
              onClick={togglePassword}
            >
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex flex-col mt-[30px]">
          <label className="mb-[5px] ml-[5px]" htmlFor="Confirm password">
            Confirm Password
          </label>
          <input
            id="Confirm password"
            name="confirmPassword"
            type={passwordShown ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleChange}
            aria-invalid={isConfirmPasswordError ? 'true' : 'false'}
            aria-required="true"
            className="border border-border py-[6px] px-[12px] rounded-[30px] "
          />
          {isConfirmPasswordError && (
            <p className="mt-[10px] text-error text-center" role="alert">
              Passwords do not match.
            </p>
          )}
        </div>
        <button
          className=" cursor-pointer w-[100%]	 transition ease-in-out duration-200 mt-[40px] mb-[30px] py-[10px] px-[30px] bg-blue rounded-[30px] text-white hover:bg-hoverFilled"
          type="submit"
          disabled={isAnyFieldEmpty || isUsernameError}
        >
          Sign up
        </button>
        <p className="text-center">
          Already have an account?{' '}
          <Link className="text-blue" to="/signin">
            Sign in.
          </Link>
        </p>
      </form>
    </div>
  )
}
