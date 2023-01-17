import Link from 'next/link'

import { GetServerSideProps } from 'next'
import { testAPI } from '../../service/test'
import { TestType } from '../../types/test'
import { categoryInText } from '../../utils/test'

interface IInfoPage {
  data: {
    test: TestType
    queryId: string
  }
}

interface IData {
  test: TestType
  queryId: string
}

export default function InfoPage({ data: { test, queryId } }: IInfoPage) {
  return (
    <div>
      <h1 className='font-mono text-2xl'>Hi</h1>
      <p className='font-mono text-xl my-2'>
        Категория теста: {categoryInText[test.category]}
      </p>
      <p className='font-mono text-xl my-2'>
        Кол-во слов в тесте: {test.words.length}
      </p>
      <p className='font-mono text-xl my-2'>Всё слова:</p>
      <div className='grid grid-cols-3'>
        {test.words.map((el) => (
          <div key={el.id}>
            {el.word} - {el.translation}
          </div>
        ))}
      </div>
      <div className='mt-[25px]'>
        <Link href={`/test/${queryId}`} className='btn'>
          Приступить
        </Link>
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
        queryId: id as string,
      },
    },
  }
}
