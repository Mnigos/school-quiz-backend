import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Question } from './interfaces/question.interface'
import { QuizDoc } from './interfaces/quizDoc.interface'
import { Taker } from './interfaces/taker.interface'

@Injectable()
export class QuizService {
  constructor(@InjectModel('quiz') private readonly QuizModel: Model<QuizDoc>) {}

  async getQuestions(quizId: string): Promise<Question[] | HttpStatus> {
    const quiz = await this.QuizModel.findOne({ _id: quizId })

    if (!quiz) return HttpStatus.BAD_REQUEST

    return quiz.questions
  }

  async checkAnswers(taker: Taker, quizId: string): Promise<any> {
    const quiz = await this.QuizModel.findOne({ _id: quizId })

    if (!quiz) return HttpStatus.BAD_REQUEST

    let score = 0

    quiz.rightAnswers.forEach((answer, i) => {
      if (answer === taker.answers[i]) score++
    })
  }
}
