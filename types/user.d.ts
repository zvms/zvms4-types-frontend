export interface User {
  _id: string // ObjectId
  id: number
  name: string
  sex: 'male' | 'female' | 'unknown'
  position: ('system' | 'admin' | 'auditor' | 'department' | 'secretary' | 'student')[]
  code: number
}

export type UserPosition = User['position'][number]

export type WithPassword<T> = {
  password: string
} & T

export interface UserLogin {
  id: number
  password: string
}

export interface ClassType {
  type: 'Z' | 'J'
  grade: number
  year: number
  class: number
  number: number
}

export interface UserActivityTimeSums {
  onCampus: number
  offCampus: number
  socialPractice: number
  trophy: number
}
