import React from 'react'

const Review = () => (
  <div
    onClick={() =>
      (window.location.href =
        'https://github.com/waterlinqq/react-money-manager')
    }
  >
    <h2>請給我顆Star吧!</h2>
    <p style={{ color: '#666' }}>前往我的github</p>
    {Array.from({ length: 5 }).map((_, i) => (
      <img
        src={require('../../../../images/system/評價我們.svg')}
        key={i}
        alt="星星"
        style={{
          height: '25px',
          padding: '6px',
          color: 'rgba(255, 217, 0, 0.876)',
        }}
      />
    ))}
  </div>
)
export default Review
