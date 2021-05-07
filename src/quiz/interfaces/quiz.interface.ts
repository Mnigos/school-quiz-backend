import { IQuestion } from './question.interface'
import { ITaker } from './taker.interface'

export interface IQuiz {
  name: string
  questions: IQuestion[]
  rightAnswers: string[]
  quizKeys: string[]
  takers: ITaker[]
}
