import { Controller, Body, Post, HttpStatus } from '@nestjs/common'
import { IQuestion } from './interfaces/question.interface'
import { ITaker } from './interfaces/taker.interface'
import { QuizService } from './quiz.service'

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  getQuestions(@Body() key: string): Promise<{ questions: IQuestion[]; id: string } | HttpStatus> {
    return this.quizService.getQuestions(key)
  }

  @Post('/check')
  checkAnswers(taker: ITaker, quizId: string): Promise<number | HttpStatus> {
    return this.quizService.checkAnswers(taker, quizId)
  }
}
