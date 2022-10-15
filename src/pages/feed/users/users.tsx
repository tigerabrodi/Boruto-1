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
      {users.map(
        ({
          bio,
          age,
          fullname,
          location,
          username,
          avatarUrl,
          profileId,
          createdAt,
        }) => {
          return (
            <User
              bio={bio}
              age={age}
              key={profileId}
              fullname={fullname}
              location={location}
              username={username}
              avatarUrl={avatarUrl}
              createdAt={createdAt}
              profileId={profileId}
              pin={''}
            />
          )
        }
      )}
    </div>
  )
}
