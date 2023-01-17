import axios from 'axios'
import { BodyCreateTestType, TestType } from '../types/test'

export const testAPI = () => {
  const uri = 'https://learn-the-words-kirillweb2.vercel.app/'
  return {
    createTest: async (data: BodyCreateTestType) => {
      return await axios
        .post<TestType>(uri + '/create', data)
        .then((res) => res.data)
    },
    getAllTest: async () => {
      return await axios.get<TestType[]>(uri).then((res) => res.data)
    },
    getPosts: async (testsId: string[]) => {
      return await axios
        .post<TestType[] | []>(uri + '/get-posts', testsId)
        .then((res) => res.data)
    },
    getPost: async (testId: string) => {
      return await axios
        .get<TestType>(uri + '/post', { params: { id: testId } })
        .then((res) => res.data)
    },
  }
}
