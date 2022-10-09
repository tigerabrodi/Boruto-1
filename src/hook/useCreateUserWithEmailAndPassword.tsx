import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordAuth } from '@firebase/auth'
import { doc, serverTimestamp } from '@firebase/firestore'
import { FirebaseError } from 'firebase/app'
import { setDoc } from 'firebase/firestore'
import { useState } from 'react'

import { firebaseAuth, firebaseDb } from '../lib/firebase'

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
        name: '',
        location: '',
        age: '',
        bio: '',
        avatarUrl: '',
        createdAt: serverTimestamp(),
        uid: user.user.uid,
      })

      const usernameRef = doc(firebaseDb, `usernames/${username}`)
      setDoc(usernameRef, {
        uid: user.user?.uid,
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
