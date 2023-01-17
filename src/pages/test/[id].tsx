import React from 'react'
import Image from 'next/image'

import { GetServerSideProps } from 'next'
import { testAPI } from '../../service/test'
import { TestType } from '../../types/test'

import img from '../../assets/sound.png'

interface ITestPage {
  data: {
    test: TestType
  }
}

interface IData {
  test: TestType
}

export default function TestPage({ data: { test } }: ITestPage) {
  const [counter, setCounter] = React.useState(0)
  const [isVisibleTranslate, setIsVisibleTranslate] = React.useState(false)

  const visionTranslate = () => setIsVisibleTranslate(!isVisibleTranslate)

  const goNext = () => {
    setIsVisibleTranslate(false)

    if (counter < test.words.length - 1) setCounter((counter) => counter + 1)
  }

  const goBack = () => {
    setIsVisibleTranslate(false)

    if (counter > 0) setCounter((counter) => counter - 1)
  }

  const sound = () => {
    if (!speechSynthesis.speaking) {
      speechSynthesis.speak(
        new SpeechSynthesisUtterance(test.words[counter].word)
      )
    }
  }

  const disabled_next = !(counter < test.words.length - 1)
  const disabled_back = !(counter > 0)

  return (
    <div className='flex items-center justify-center w-[100%] h-[100vh]'>
      <div className='flex flex-col items-center gap-[30px]'>
        <div className='flex items-center font-mono text-4xl'>
          <Image
            onClick={sound}
            className='w-[27px] h-[27px] mr-[15px] cursor-pointer'
            src={img}
            alt=''
          />
          <span>{test.words[counter].word}</span>&nbsp;-&nbsp;
          {isVisibleTranslate ? (
            <span className='cursor-pointer' onClick={visionTranslate}>
              {test.words[counter].translation}
            </span>
          ) : (
            <div
              onClick={visionTranslate}
              className='bg-gray-500 text-gray-500 rounded-md select-none cursor-pointer'
            >
              {test.words[counter].translation}
            </div>
          )}
        </div>
        <p className='text-gray-400'>
          Нажмите на прямоугольник для просмотра перевода
        </p>
        <div className='flex items-center gap-[20px]'>
          <div>
            <button disabled={disabled_back} onClick={goBack} className='btn'>
              Назад
            </button>
          </div>
          <div>
            <button disabled={disabled_next} onClick={goNext} className='btn'>
              Следующее
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ data: IData }> = async ({
  query,
}) => {
  const { id } = query

  const test = await testAPI().getPost(id as string)

  return {
    props: {
      data: {
        test,
      },
    },
  }
}
