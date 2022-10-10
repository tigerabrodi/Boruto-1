/* eslint-disable react/react-in-jsx-scope */

import { useMenuContext } from '../../../context/MenuContext'

export default function Authenticated() {
  const { setIsOpen } = useMenuContext()

  return (
    <div
      role="nav"
      aria-label="authenticated menu"
      className="absolute right-[30px] top-[85px] bg-white p-[30px] rounded-[5px] border border-border shadow-md"
    >
      authenticated
    </div>
  )
}
