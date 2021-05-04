import { Document } from 'mongoose'
import { Question } from './question.interface'
import { Taker } from './taker.interface'

export interface QuizDoc extends Document {
  name: string
  questions: Question[]
  rightAnswers: string[]
  takers: Taker[]
}
