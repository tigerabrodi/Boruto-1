/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */

import { collection, CollectionReference, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { User } from '..'
import { firebaseDb, UserType } from '../../../lib'

export function Users() {
  const [users, setUsers] = useState<UserType[]>([])

  const usersCollectionReference = collection(
    firebaseDb,
    'users'
  ) as CollectionReference<UserType>

  useEffect(() => {
    const unsubscribe = onSnapshot(usersCollectionReference, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({ ...doc.data(), profileId: doc.id }))
      )
    })

    return () => {
      unsubscribe()
    }
  }, [firebaseDb])
  return (
    <div className="mt-[15px]">
      {users.map((user) => {
        return <User key={user.profileId} user={user} />
      })}
    </div>
  )
}
