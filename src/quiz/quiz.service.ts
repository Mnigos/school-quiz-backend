import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IQuestion } from './interfaces/question.interface'
import { IQuizDoc } from './interfaces/quizDoc.interface'
import { IQuiz } from './interfaces/quiz.interface'
import { ITaker } from './interfaces/taker.interface'
import { generateKey } from './functions/genereteKey'

@Injectable()
export class QuizService {
  constructor(@InjectModel('Quizes') private readonly QuizModel: Model<IQuizDoc>) {}

  async getQuizes(): Promise<{ _id: string; name: string }[]> {
    const quizes = await this.QuizModel.find().exec()

    return quizes.map(({ _id, name }) => ({ _id, name }))
  }

  async getQuiz(_id: string): Promise<IQuiz> {
    return await this.QuizModel.findOne({ _id }).exec()
  }

  async getQuestions(key: string): Promise<{ questions: IQuestion[]; id: string } | HttpStatus> {
    const quiz = await this.QuizModel.findOne({ quizKey: key }).exec()

    if (!quiz) return HttpStatus.BAD_REQUEST
    return {
      questions: quiz.questions,
      id: quiz.id,
    }
  }

  async checkAnswers(taker: ITaker, quizId: string): Promise<number | HttpStatus> {
    const quiz = await this.QuizModel.findOne({ _id: quizId }).exec()

    if (!quiz) return HttpStatus.BAD_REQUEST

    let score = 0

    quiz.rightAnswers.forEach((answer, i) => {
      if (answer === taker.answers[i].answer) ++score
    })

    taker.score = score
    quiz.takers.push(taker)

    this.QuizModel.updateOne({ _id: quizId }, quiz).exec()

    return score
  }

  async createQuiz(quiz: IQuiz): Promise<IQuiz> {
    return await this.QuizModel.create(quiz)
  }

  async updateQuiz(quiz: IQuiz): Promise<IQuiz | HttpStatus> {
    const { _id } = quiz

    const foundedQuiz = await this.QuizModel.findOne({ _id }).exec()

    if (!foundedQuiz) return HttpStatus.BAD_REQUEST

    this.QuizModel.updateOne({ _id }, quiz)

    return (await this.QuizModel.findOne({ _id }).exec()) as IQuiz
  }

  async generateQuizKey(quizId: string): Promise<string | HttpStatus> {
    const foundedQuiz = await this.QuizModel.findOne({ _id: quizId }).exec()

    if (!foundedQuiz) return HttpStatus.BAD_REQUEST

    const newKey = generateKey()

    const { _id } = foundedQuiz

    this.QuizModel.updateOne({ _id }, { quizKey: newKey })

    return newKey
  }
}
