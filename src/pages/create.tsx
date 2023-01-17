import React, { ChangeEvent } from 'react'
import { CategoriesType } from '../types/test'
import { testAPI } from '@/service/test'
import { parsing, setNewTestInCookies, categories } from '../utils/test'

export default function Create() {
  const [text, setText] = React.useState('')
  const [isActiveSwitch, setIsActiveSwitch] = React.useState(false)
  const [isCreating, setIsCreating] = React.useState(false)
  const [category, setCategory] = React.useState<CategoriesType>(
    CategoriesType.ALL
  )

  const changeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value)

  const changeSwitchState = () => setIsActiveSwitch(!isActiveSwitch)

  const changeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value as CategoriesType)

  const send = async () => {
    if (!text) return alert('Заполните поле с текстом')

    setIsCreating(true)

    const new_test = await testAPI().createTest({
      visibility: isActiveSwitch,
      category: category,
      words: parsing(text),
    })

    setNewTestInCookies(new_test._id)

    setText('')
    setCategory(CategoriesType.ALL)
    setIsActiveSwitch(false)

    setIsCreating(false)
  }

  return (
    <div>
      <h1 className='text-2xl font-mono mb-[10px]'>Hi</h1>
      <p className='text-xl font-mono'>
        Чтобы всё работало сработало, тебе нужно написать все свои слова с
        переводом снизу. После создания, тебя перекинет на страницу с тестом. Ты
        можешь выбрать `Кому виден тест - всем` и тогда, все смогут пройти его.
      </p>
      <p className=' font-mono'>
        Промер: apple - яблоко, car - машина, dog - собака
      </p>
      <textarea
        className='textarea'
        value={text}
        onChange={changeTextArea}
        placeholder='apple - яблоко, car - машина, dog - собака'
      ></textarea>
      <p className='mb-[10px] font-mono'>
        Желательно не использовать лишних `-`.
      </p>
      <select className='select' value={category} onChange={changeCategory}>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.text}
          </option>
        ))}
      </select>

      <div className='flex items-center gap-[25px] mt-[10px]'>
        <p>Открыть доступ для всех?</p>
        <div
          onClick={changeSwitchState}
          className={`switch-btn ${isActiveSwitch && 'switch-on'}`}
        ></div>
      </div>

      <div className='flex justify-end mr-[10px] width-[calc(100% - 10px)] items-center'>
        <button disabled={isCreating} onClick={send} className='btn'>
          Создать
        </button>
      </div>
    </div>
  )
}
