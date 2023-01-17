import { TestType } from '../types/test'
import { TestItem } from './TestItem'

interface ITestList {
  tests: TestType[]
}

export const TestList: React.FC<ITestList> = ({ tests }) => {
  if (!tests) return null
  return (
    <div className='flex items-center gap-2 w-[100%] flex-wrap'>
      {tests.map((test) => (
        <TestItem key={test._id} test={test} />
      ))}
    </div>
  )
}
