import React, { FC } from 'react'

const Mask: FC<{ clicked(): void; show: boolean }> = ({ clicked, show }) => {
  const style = {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 9999,
    display: show ? 'block' : 'none',
  }
  return <div style={style} onClick={clicked} />
}
export default Mask
