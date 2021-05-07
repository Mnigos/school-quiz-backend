import { Controller, Param, Post } from '@nestjs/common'
import { QuizService } from './quiz.service'

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('get/:id')
  getQuestions(@Param('id') id: string) {
    return this.quizService.getQuestions(id)
  }
}
