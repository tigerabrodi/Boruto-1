/* eslint-disable react/react-in-jsx-scope */
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_AVATAR } from '../../../lib'

export function Unauthenticated() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-label="unauthenticated nav menu"
        aria-controls={open ? 'unauthenticated nav menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={DEFAULT_AVATAR} alt="" className="w-12" />
      </Button>
      <Menu
        id="unauthenticated nav menu"
        aria-label='"unauthenticated nav menu"'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ top: '18px' }}
      >
        <img
          src={DEFAULT_AVATAR}
          alt=""
          className="w-20 mx-auto mb-[30px] mt-[20px]"
        />
        <p
          className="w-[250px] text-[24px] font-semibold text-dark  mb-[10px] text-center  mx-[10px]"
          tabIndex={0}
        >
          Sign up or sign in to your Boruto account.
        </p>
        <p className="text-darkGrey mb-[20px] px-[15px] mx-[10px]" tabIndex={0}>
          Takes less than a few seconds.
        </p>

        <div className="flex justify-between   mx-[15px] mb-[20px]">
          <Link
            onClick={handleClose}
            className=" transition ease-in-out duration-200 py-[10px] px-[30px] bg-blue rounded-[30px] text-white hover:bg-hoverFilled"
            to="/signup"
          >
            Sign up
          </Link>
          <Link
            onClick={handleClose}
            className=" transition ease-in-out duration-200 py-[10px] px-[30px] rounded-[30px] text-blue border border-blue hover:bg-hoverOutlined"
            to="/signin"
          >
            Sign in
          </Link>
        </div>
      </Menu>
    </div>
  )
}
