import Link from 'next/link'

interface IMainGreeting {}

export const MainGreeting: React.FC<IMainGreeting> = ({}) => {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh]'>
      <h1 className='text-4xl mb-[20px]'>Генератор тестов</h1>
      <ul className='text-center'>
        <li className='text-2xl'>Создавайте тесты</li>

        <li className='text-2xl'>Изучайте слова быстро и просто</li>
        <li className='text-2xl'>
          Делитесь тестами с друзьями или проходите их сами
        </li>
      </ul>
      <div className='mt-[30px]'>
        <Link href={'/create'} className='btn text-xl '>
          Перейти к созданию
        </Link>
      </div>
    </div>
  )
}
