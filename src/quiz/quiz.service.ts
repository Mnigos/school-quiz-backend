import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { QuizDoc } from './interfaces/quizDoc.interface'

@Injectable()
export class QuizService {
  constructor(@InjectModel('quiz') private readonly QuizModel: Model<QuizDoc>) {}
}
