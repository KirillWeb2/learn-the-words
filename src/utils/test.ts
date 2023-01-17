import { parseCookies } from 'nookies'
import { WordType, ArrayCategoriesType, CategoriesType } from '../types/test'
import nookies from 'nookies'

export const categoryInText = {
  all: 'В перемешку',
  verbs: 'Глаголы',
  nouns: 'Существительные',
  communions: 'Причастия',
  sentence: 'Предложение',
}

export const categories: ArrayCategoriesType[] = [
  { text: 'В перемешку', value: CategoriesType.ALL },
  { text: 'Глаголы', value: CategoriesType.VERBS },
  { text: 'Существительные', value: CategoriesType.NOUNS },
  { text: 'Причастия', value: CategoriesType.COMMUNIONS },
  { text: 'Предложения', value: CategoriesType.SENTENCE },
]

export const parsing = (text: string): WordType[] => {
  return text
    .split(',')
    .map((el, index) => {
      const words = el.split('-')
      const word = words.at(0)?.trim() as string
      const translate = words.at(1)?.trim() as string

      if (word) {
        return {
          id: `${index}`,
          translation: translate,
          word: word,
        } as WordType
      }
    })
    .filter((el) => el !== undefined) as WordType[]
}

export const setNewTestInCookies = (testId: string): void => {
  const { tests } = parseCookies()

  if (tests) {
    const new_tests = JSON.stringify([
      ...(JSON.parse(tests) as string[]),
      testId,
    ])
    nookies.set(null, 'testsId', new_tests, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  } else {
    const new_tests = JSON.stringify([testId])
    nookies.set(null, 'testsId', new_tests, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }
}
