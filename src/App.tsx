/* eslint-disable react/react-in-jsx-scope */

import { lazy, Suspense } from 'react'
import { Header } from './components'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { MenuContextProvider } from './context/MenuContext'
import { Toaster } from 'react-hot-toast'
import { ToastOptions } from './lib/theme'
import { LoadingSpinner } from './components/spinner'

const Feed = lazy(() => import('./pages/feed/feed'))
const Signin = lazy(() => import('./pages/signin/signin'))
const Signup = lazy(() => import('./pages/signup/signup'))
const CreateProfile = lazy(() => import('./pages/createProfile/CreateProfile'))
const User = lazy(() => import('./pages/user/user'))
const CreateArticle = lazy(() => import('./pages/createArticle/CreateArticle'))
const Article = lazy(() => import('./pages/article/article'))

export function App() {
  return (
    <div>
      <Toaster position="top-center" toastOptions={ToastOptions} />
      <LoadingSpinner />
      <AuthContextProvider>
        <MenuContextProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Feed />
                </Suspense>
              }
            />
            <Route
              path="/signin"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Signin />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Signup />
                </Suspense>
              }
            />
            <Route
              path="/create/profile"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <CreateProfile />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <User />
                </Suspense>
              }
            />

            <Route
              path="/article/create"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <CreateArticle />
                </Suspense>
              }
            />

            <Route
              path="/article/:id"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Article />
                </Suspense>
              }
            />
          </Routes>
        </MenuContextProvider>
      </AuthContextProvider>
    </div>
  )
}
