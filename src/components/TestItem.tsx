import { TestType } from '../types/test'
import Link from 'next/link'
import { categoryInText } from '../utils/test'

interface ITestItem {
  test: TestType
}

export const TestItem: React.FC<ITestItem> = ({ test }) => {
  const { _id, category, visibility, words } = test

  return (
    <div className='flex items-center justify-between p-4 rounded-lg shadow-lg bg-[#0F0F0F] min-w-[330px] gap-4'>
      <div>
        <p className='text-xl font-mono'>{categoryInText[category]}</p>
        <p className='text-xl font-mono text-gray-400'>{words.length} слов.</p>
      </div>
      <div>
        <Link href={`/info/${_id}`} className='btn'>
          Смотреть
        </Link>
      </div>
    </div>
  )
}
