/* eslint-disable react/react-in-jsx-scope */

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider, InfoContextProvider } from './context'
import { Toaster } from 'react-hot-toast'
import { ToastOptions } from './lib/theme'
import { Header, LoadingSpinner } from './components'

const Feed = lazy(() => import('./pages/feed'))
const Signin = lazy(() => import('./pages/signin'))
const Signup = lazy(() => import('./pages/signup'))
const CreateProfile = lazy(() => import('./pages/createProfile'))
const CreateArticle = lazy(() => import('./pages/createArticle'))
const Article = lazy(() => import('./pages/article'))
const Profile = lazy(() => import('./pages/profile'))
const EditProfile = lazy(() => import('./pages/EditProfile'))

export function App() {
  return (
    <div>
      <InfoContextProvider>
        <Toaster position="top-center" toastOptions={ToastOptions} />
        <LoadingSpinner />
        <AuthContextProvider>
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

            <Route
              path="/profile/:id"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/profile/edit/:id"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <EditProfile />
                </Suspense>
              }
            />
          </Routes>
        </AuthContextProvider>
      </InfoContextProvider>
    </div>
  )
}
