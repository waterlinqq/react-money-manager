import React, { useEffect, useRef, FC } from 'react'
import { createPortal } from 'react-dom'

import Mask from '../Mask/Mask'

const style = {
  position: 'fixed' as 'fixed',
  top: '50%',
  left: '50%',
  padding: '20px',
  transform: 'translate(-50%,-50%)',
  zIndex: 999999,
  backgroundColor: '#fff',
  borderRadius: '5px',
  boxShadow: '0px 2px 3px #999',
}

interface IProps {
  onLeft(): void
  show: boolean
}
const Modal: FC<IProps> = ({ children, show, onLeft }) => {
  const elRef = useRef<HTMLDivElement>(document.createElement('div'))
  useEffect(() => {
    const modalRoot = document.getElementById('modal')!
    const modal = elRef.current!
    modalRoot.appendChild(modal)
    return () => {
      modalRoot.removeChild(modal)
    }
  }, [])
  const ele = (
    <div>
      <div style={style}>{children}</div>
      <Mask clicked={onLeft} show={show} />
    </div>
  )

  return show ? createPortal(ele, elRef.current) : null
}

export default Modal
