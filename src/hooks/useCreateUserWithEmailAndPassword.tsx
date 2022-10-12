import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordAuth } from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import { firebaseAuth, firebaseDb } from '../lib/'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'

export const useCreateUserWithEmailAndPassword = () => {
  const [signUpError, setSignUpError] = useState<FirebaseError | null>(null)

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const user = await createUserWithEmailAndPasswordAuth(
        firebaseAuth,
        email,
        password
      )

      const userRef = doc(firebaseDb, `users/${user.user.uid}`)

      setDoc(userRef, {
        username,
        email,
        fullname: '',
        location: '',
        age: '',
        bio: '',
        avatarUrl: '',
        pin: user.user.uid,
      })

      const usernameRef = doc(firebaseDb, `usernames/${username}`)
      setDoc(usernameRef, {
        pin: user.user?.uid,
      })
    } catch (error) {
      setSignUpError(error as FirebaseError)
      setTimeout(() => {
        setSignUpError(null)
      }, 3000)
    }
  }

  return {
    createUserWithEmailAndPassword,
    signUpError,
  }
}
