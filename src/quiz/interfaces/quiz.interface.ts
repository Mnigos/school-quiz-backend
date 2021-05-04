import { question } from './question.interface'

export interface quizDoc {
  name: string
  questions: question[]
  rightAnswers: number[]
}
