import { Document } from 'mongoose'
import { IQuestion } from './question.interface'
import { ITaker } from './taker.interface'

export interface IQuizDoc extends Document {
  name: string
  questions: IQuestion[]
  rightAnswers: string[]
  quizKeys: string[]
  takers: ITaker[]
}
