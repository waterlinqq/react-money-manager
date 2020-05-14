import React, { FC } from 'react'

const CustomIcon: FC<any> = ({
  type,
  className = '',
  size = 'md',
  ...restProps
}) => (
  <svg
    className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}
    {...restProps}
  >
    <use xlinkHref={type} /> {/* svg-sprite-loader@0.3.x */}
    {/* <use xlinkHref={#${type.default.id}} /> */}{' '}
    {/* svg-sprite-loader@latest */}
  </svg>
)
export default CustomIcon
// ;<CustomIcon type={require('./foo.svg')} />
