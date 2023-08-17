export interface AuthSignInPayload {
  password: string
  username: string
}

export interface AuthResult {
  accessToken: string
  refreshToken: string
}

export interface AuthSignUpPayload extends AuthSignInPayload {
  firstName: string
  middleName: string
  lastName: string
  email: string
}
