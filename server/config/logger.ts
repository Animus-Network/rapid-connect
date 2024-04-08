interface LoggerConfig {
    quietReqLogger: boolean,
    browser: {
        asObject: boolean;
    };
}

const loggerConfig: LoggerConfig = {
    quietReqLogger: false, // turn off the default logging output
    browser: { 
        asObject: true 
    }
}

export { loggerConfig };