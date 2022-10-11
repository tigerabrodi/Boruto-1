/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom'
import { useAuthContext, useMenuContext } from '../../context/'
import { Avatar, Authenticated, Unauthenticated } from './index'

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
