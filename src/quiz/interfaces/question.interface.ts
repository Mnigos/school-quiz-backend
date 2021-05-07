export interface IQuestion {
  title: string
  img: string
  questionType: 'radio' | 'checkbox' | 'text'
  description: string
}
