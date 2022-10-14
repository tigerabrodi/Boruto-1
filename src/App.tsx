/* eslint-disable react/react-in-jsx-scope */

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider, InfoContextProvider } from './context'
import { Toaster } from 'react-hot-toast'
import { ToastOptions } from './lib/theme'
import { Header, LoadingSpinner, LazySpinner } from './components'

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
                <Suspense fallback={<LazySpinner />}>
                  <Feed />
                </Suspense>
              }
            />
            <Route
              path="/signin"
              element={
                <Suspense fallback={<LazySpinner />}>
                  <Signin />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={<LazySpinner />}>
                  <Signup />
                </Suspense>
              }
            />
            <Route
              path="/profiles/create"
              element={
                <Suspense fallback={<LazySpinner />}>
                  <CreateProfile />
                </Suspense>
              }
            />

            <Route
              path="/articles/create"
              element={
                <Suspense fallback={<LazySpinner />}>
                  <CreateArticle />
                </Suspense>
              }
            />

            <Route
              path="/articles/:id"
              element={
                <Suspense fallback={<LazySpinner />}>
                  <Article />
                </Suspense>
              }
            />

            <Route
              path="/profiles/:id"
              element={
                <Suspense fallback={<LazySpinner />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/profiles/edit/:id"
              element={
                <Suspense fallback={<LazySpinner />}>
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
