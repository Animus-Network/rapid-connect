import { HttpStatus, HttpStatusCode } from '../interfaces/http.interface';

const HttpStatusCodeOK: HttpStatusCode = {
    CODE: 200,
    MESSAGE: 'OK'
};

const HttpStatusCodeCreated: HttpStatusCode = {
    CODE: 201,
    MESSAGE: 'Created'
};

const HttpStatusCodeNoContent: HttpStatusCode = {
    CODE: 204,
    MESSAGE: 'No Content'
};

const HttpStatusCodeBadRequest: HttpStatusCode = {
    CODE: 400,
    MESSAGE: 'Bad Request'
};

const HttpStatusCodeUnauthorized: HttpStatusCode = {
    CODE: 401,
    MESSAGE: 'Unauthorized'
};

const HttpStatusCodeForbidden: HttpStatusCode = {
    CODE: 403,
    MESSAGE: 'Forbidden'
};

const HttpStatusCodeNotFound: HttpStatusCode = {
    CODE: 404,
    MESSAGE: 'Not Found'
};

const HttpStatusCodeMethodNotAllowed: HttpStatusCode = {
    CODE: 405,
    MESSAGE: 'Method Not Allowed'
};

const HttpStatusCodeInternalServerError: HttpStatusCode = {
    CODE: 500,
    MESSAGE: 'Internal Server Error'
};

const status: HttpStatus = {
    HTTP_200: HttpStatusCodeOK,
    HTTP_201: HttpStatusCodeCreated,
    HTTP_204: HttpStatusCodeNoContent,
    HTTP_400: HttpStatusCodeBadRequest,
    HTTP_401: HttpStatusCodeUnauthorized,
    HTTP_403: HttpStatusCodeForbidden,
    HTTP_404: HttpStatusCodeNotFound,
    HTTP_405: HttpStatusCodeMethodNotAllowed,
    HTTP_500: HttpStatusCodeInternalServerError
};
  
export default status;