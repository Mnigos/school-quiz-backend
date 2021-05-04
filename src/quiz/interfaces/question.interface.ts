export interface question {
  title: string
  img: string
  questionType: 'radio' | 'checkbox' | 'text'
  description: string
  answers: string[] | string
}
