import React from 'react'
import nookies from 'nookies'
import { GetServerSideProps } from 'next'
import { testAPI } from '../service/test'
import { TestType } from '../types/test'
import { TestList } from '@/components/TestList'

interface ITests {
  data: {
    tests: TestType[]
    active_tests: TestType[]
  }
}

interface IData {
  tests: TestType[]
  active_tests: TestType[]
}

export default function Tests({ data: { tests, active_tests } }: ITests) {
  return (
    <div>
      <h1 className='font-mono text-2xl'>Hi</h1>
      <p className='my-2'>
        Тут ты найдёшь все тесты, которые создали другие пользователи и любезно
        поделились со всеми.
      </p>
      <h1 className='font-mono text-2xl my-2'>Созданные вами</h1>
      <TestList tests={active_tests} />
      <h1 className='font-mono text-2xl my-2'>Другие</h1>
      <TestList tests={tests} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ data: IData }> = async (
  ctx
) => {
  const { testsId } = nookies.get(ctx)

  const tests = await testAPI().getAllTest()
  const active_tests = await testAPI().getPosts(JSON.parse(testsId) as string[])

  return {
    props: {
      data: {
        tests,
        active_tests,
      },
    },
  }
}
