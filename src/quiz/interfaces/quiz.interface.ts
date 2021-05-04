import { Question } from './question.interface'
import { Taker } from './taker.interface'

export interface Quiz {
  name: string
  questions: Question[]
  rightAnswers: string[]
  takers: Taker[]
}
