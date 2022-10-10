import { signInWithEmailAndPassword as signInWithEmailAndPasswordAuth } from '@firebase/auth'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { firebaseAuth } from '../lib/firebase'
import { useLoadingStore } from '../lib/store'

export const useSignInWithEmailAndPassword = () => {
  const [isSignInError, setIsSignInError] = useState(false)

  const navigate = useNavigate()
  const { setStatus } = useLoadingStore()

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setStatus('loading')
    try {
      await signInWithEmailAndPasswordAuth(firebaseAuth, email, password)

      navigate('/')
      toast.success('Successfully signed in into your account!')
      setStatus('success')
    } catch (error) {
      setIsSignInError(true)
      setStatus('error')
      setTimeout(() => {
        setIsSignInError(false)
      }, 3000)
    }
  }

  return {
    signInWithEmailAndPassword,
    isSignInError,
  }
}
