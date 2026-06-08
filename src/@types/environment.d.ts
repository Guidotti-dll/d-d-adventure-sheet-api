export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string
      DB_PORT: string
      DB_USER: string
      DB_PASSWORD: string
      DB_NAME: string
      DB_READER_HOST: string
      DB_READER_PORT: string
      STAGE: string
      PRIVATE_API_GATEWAY_URL: string
      PORT: string
      SKIP_PERMISSION_CHECK: string
      JWT_SECRET: string
      JWT_EXPIRES_IN: string
      PASSWORD_RECOVERY_TOKEN_EXPIRES_IN_HOURS: string
      PASSWORD_RECOVERY_URL: string
    }
  }
}
