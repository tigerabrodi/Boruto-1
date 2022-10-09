/* eslint-disable react/react-in-jsx-scope */

import { lazy, Suspense } from 'react'
import { Header } from './components'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { MenuContextProvider } from './context/MenuContext'

const Feed = lazy(() => import('./pages/feed/feed'))
const Signup = lazy(() => import('./pages/signup/signup'))

export function App() {
  return (
    <AuthContextProvider>
      <MenuContextProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback="loading...">
                <Feed />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback="loading...">
                <Signup />
              </Suspense>
            }
          />
        </Routes>
      </MenuContextProvider>
    </AuthContextProvider>
  )
}
