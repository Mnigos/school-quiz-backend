export interface IQuestion {
  id: string
  title: string
  img: string
  questionType: 'radio' | 'checkbox' | 'text'
  description: string
}
