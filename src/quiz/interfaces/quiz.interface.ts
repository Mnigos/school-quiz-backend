import { IQuestion } from './question.interface'
import { ITaker } from './taker.interface'

export interface IQuiz {
  _id?: string
  name: string
  questions: IQuestion[]
  rightAnswers: string[]
  quizKeys: string[]
  takers: ITaker[]
}
