import { IAnswer } from './answer.interface'

export interface ITaker {
  name: string
  surename: string
  answers: IAnswer[]
  score: number | undefined
}
