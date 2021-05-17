import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IQuestion } from './interfaces/question.interface'
import { IQuizDoc } from './interfaces/quizDoc.interface'
import { ITaker } from './interfaces/taker.interface'

@Injectable()
export class QuizService {
  constructor(@InjectModel('quiz') private readonly QuizModel: Model<IQuizDoc>) {}

  async getQuestions(key: string): Promise<IQuestion[] | HttpStatus> {
    const quiz = await this.QuizModel.findOne({ quizKey: key })

    if (!quiz) return HttpStatus.BAD_REQUEST

    return quiz.questions
  }

  async checkAnswers(taker: ITaker, quizId: string): Promise<number | HttpStatus> {
    const quiz = await this.QuizModel.findOne({ _id: quizId })

    if (!quiz) return HttpStatus.BAD_REQUEST

    let score = 0

    quiz.rightAnswers.forEach((answer, i) => {
      if (answer === taker.answers[i].answer) ++score
    })

    taker.score = score
    quiz.takers.push(taker)

    this.QuizModel.updateOne({ _id: quizId }, quiz)

    return score
  }
}
