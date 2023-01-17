export enum CategoriesType {
  ALL = 'all',
  VERBS = 'verbs',
  NOUNS = 'nouns',
  COMMUNIONS = 'communions',
  SENTENCE = 'sentence',
}

export type ArrayCategoriesType = {
  text: string
  value: CategoriesType
}

export type WordType = {
  id: string
  word: string
  translation: string
}

export type BodyCreateTestType = {
  visibility: boolean
  category: CategoriesType
  words: WordType[]
}

export type TestType = {
  _id: string
  visibility: boolean
  category: CategoriesType
  words: WordType[]
}
