import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { AppService } from './app.service'
import { QuizModule } from './quiz/quiz.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    QuizModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
