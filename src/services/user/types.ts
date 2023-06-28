export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updateAt: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterUserData extends LoginData {
  confirmPassword: string
  name: string
}

