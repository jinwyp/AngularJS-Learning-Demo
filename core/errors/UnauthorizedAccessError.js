
function UnauthorizedAccessError(code, message, field) {
    Error.captureStackTrace(this, this.constructor);

    this.type = "UserLevelOperationalError";
    this.name = "UnauthorizedAccessError";
    this.message = message || "Unauthorized Access Token";

    this.code = code || 401;
    this.field = field || "unknownfield";
    this.status = 401;
}

UnauthorizedAccessError.prototype = Object.create(Error.prototype);
UnauthorizedAccessError.prototype.constructor = UnauthorizedAccessError;

module.exports = UnauthorizedAccessError;
