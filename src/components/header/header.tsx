/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { useMenuContext } from '../../context/MenuContext'
import { Avatar } from './avatar'
import Authenticated from './menu/authenticated'
import { Unauthenticated } from './menu/unauthenticated'

export function Header() {
  const { isOpen } = useMenuContext()
  const { user } = useAuthContext()

  return (
    <header className=" z-10 fixed w-screen flex items-center justify-between py-[15px] px-[30px] bg-white border-b border-border ">
      <Link
        to="/"
        aria-label="Home"
        className="text-4xl font-semibold text-dark"
      >
        Boruto
      </Link>

      <aside className="relative">
        <Avatar />
      </aside>

      {isOpen && <>{user?.uid ? <Authenticated /> : <Unauthenticated />}</>}
    </header>
  )
}
