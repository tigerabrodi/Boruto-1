/* eslint-disable react/react-in-jsx-scope */
import { CgSpinner } from 'react-icons/cg'

import './style.css'

export const LazySpinner = () => {
  return (
    <div role="alert" aria-label="loading" className="spinner">
      <CgSpinner className="spin " />
    </div>
  )
}
