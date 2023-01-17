import Link from 'next/link'
import React from 'react'

interface ISidebarElement {
  path: string
  text: string
  selected: boolean
  setSelected: (path: string) => void
}

export const SidebarElement: React.FC<ISidebarElement> = ({
  path,
  text,
  selected,
  setSelected,
}) => {
  const [isActive, setIsActive] = React.useState(false)

  const moved = () => setIsActive(true)

  const leaved = () => setIsActive(false)

  return (
    <Link href={`${path}`}>
      <li
        onClick={() => setSelected(path)}
        onMouseMove={moved}
        onMouseLeave={leaved}
        className='sidebar-item'
      >
        {text}
        {(isActive || selected) && (
          <span className='sidebar-item-border'></span>
        )}
      </li>
    </Link>
  )
}

export const SidebarElementMemo = React.memo(SidebarElement)
