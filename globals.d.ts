declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string;
    DB_URL: string;
    DB_NAME?: string;
    JWT_SECRET: string;
    BACKEND_SERVER: string
    TWITCHAPI: string,
    TWITCH_CLIENT_ID: string
  }
}