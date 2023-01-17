import { SidebarElementMemo } from '@/components/SidebarElement'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export interface ISidebar {
  children: React.ReactNode
}
export interface IPath {
  key: string
  path: string
  text: string
}

const paths: IPath[] = [
  { key: '1', path: '/', text: 'Главная' },
  { key: '2', path: '/create', text: 'Создать тест' },
  { key: '3', path: '/tests', text: 'Все тесты' },
]

export const Sidebar: React.FC<ISidebar> = ({ children }) => {
  const [selected, setSelected] = React.useState('/')

  const submit = React.useCallback((path: string) => {
    setSelected(path)
  }, [])

  const router = useRouter()

  useEffect(() => {
    setSelected(router.pathname)
  }, [router])

  return (
    <div className='flex gap-x-[10px]'>
      <div className='bg-[#0F0F0F] w-[20%] h-[100vh] min-w-[210px]'>
        <h1 className='font-extralight text-white text-3xl p-[20px]'>
          Учи слова просто
        </h1>
        <ul>
          {paths.map((i) => (
            <SidebarElementMemo
              key={i.key}
              path={i.path}
              text={i.text}
              selected={selected === i.path}
              setSelected={submit}
            />
          ))}
        </ul>
      </div>
      <div className='w-[80%] mt-[20px]'>{children}</div>
    </div>
  )
}
