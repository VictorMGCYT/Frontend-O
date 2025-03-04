import React from 'react'

interface Props{
    text:string
}

const HeaderTitle: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <p className="dark:text-white font-extrabold text-black truncate">{text}</p>
    </div>
  )
}

export default HeaderTitle
