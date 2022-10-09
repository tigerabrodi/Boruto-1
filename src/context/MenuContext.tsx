import type { Dispatch, SetStateAction } from 'react'

import React from 'react'
import { useContext, createContext, useState } from 'react'

type MenuContextType = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const MenuContext = createContext<MenuContextType>({
  isOpen: false,
  setIsOpen: () => undefined,
})

export const MenuContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenuContext = () => {
  return useContext(MenuContext)
}
