/* eslint-disable react/react-in-jsx-scope */

import { Header } from './components'
import { AuthContextProvider } from './context/AuthContext'

export function App() {
  return (
    <div>
      <AuthContextProvider>
        <Header />
      </AuthContextProvider>
    </div>
  )
}
