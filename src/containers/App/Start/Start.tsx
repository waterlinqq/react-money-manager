import React, { useEffect, useState } from 'react'

const style = {
  position: 'fixed' as 'fixed',
  zIndex: 999,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundImage: `url(${require('images/system/載入.jpg')}`,
}
// Start loading effect should take only once.
const Start = React.memo(() => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    setTimeout(() => setShow(false), 2000)
  }, [])
  return show ? <div style={style} /> : null
})
export default Start
