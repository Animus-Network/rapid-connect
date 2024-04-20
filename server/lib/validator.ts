import Ajv, { ValidateFunction, ValidationError } from "ajv"

const validator = new Ajv();

export { validator, Ajv, ValidateFunction, ValidationError };