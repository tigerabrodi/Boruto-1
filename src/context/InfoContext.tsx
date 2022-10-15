import type { Dispatch, SetStateAction } from 'react'

import React from 'react'
import { useContext, createContext, useState } from 'react'

type InfoContextType = {
  popup: boolean
  setPopup: Dispatch<SetStateAction<boolean>>
}

const InfoContext = createContext<InfoContextType>({
  popup: false,
  setPopup: () => undefined,
})

export const InfoContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <InfoContext.Provider
      value={{ popup: isPopupOpen, setPopup: setIsPopupOpen }}
    >
      {children}
    </InfoContext.Provider>
  )
}

export const useInfoContext = () => {
  return useContext(InfoContext)
}
