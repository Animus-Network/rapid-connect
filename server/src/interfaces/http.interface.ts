interface HttpStatusCode {
    CODE: number;
    MESSAGE: string;
}

interface HttpStatus {
    [key: string]: HttpStatusCode;
}

export { HttpStatus, HttpStatusCode };