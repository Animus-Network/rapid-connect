class Config {
    static ENVIRONMENT: string = process.env.ENVIRONMENT || 'development'
    static LOGLEVEL: string = process.env.LOGLEVEL || 'info'
    static LOGFILE: string = process.env.LOGFILE || '/var/log/app.log'
    static HOST: string = process.env.HOST || '127.0.0.1'
    static PORT: number = Number(process.env.PORT) || 5000
  };
    
  export { Config };