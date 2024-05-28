declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        DATABASE_URL: string;
        NODE_ENV: 'development' | 'production' | 'test';
        JWT_ACCESS_SECRET: string
        JWT_ACCESS_EXPIRESIN: string
        JWT_REFRESH_SECRET: string
        JWT_REFRESH_EXPIRESIN: string
    }
}