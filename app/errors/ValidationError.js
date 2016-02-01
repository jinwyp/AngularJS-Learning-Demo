var validationCode = require('./ValidationCode.js');


function ValidationError(code, message, field) {
    Error.captureStackTrace(this, this.constructor);

    this.type = "UserLevelOperationalError";
    this.name = "ValidationError";
    this.message = message || "Field Validation Error";

    this.code = code || 400;
    this.field = field || "unknownfield";
    this.status = 400;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

ValidationError.code = validationCode;



module.exports = ValidationError;
