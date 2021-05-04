export interface Question {
  title: string
  img: string
  questionType: 'radio' | 'checkbox' | 'text'
  description: string
}
