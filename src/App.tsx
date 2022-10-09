/* eslint-disable react/react-in-jsx-scope */

import { Header } from './components'
import { AuthContextProvider } from './context/AuthContext'
import { MenuContextProvider } from './context/MenuContext'

export function App() {
  return (
    <MenuContextProvider>
      <AuthContextProvider>
        <Header />
      </AuthContextProvider>
    </MenuContextProvider>
  )
}
