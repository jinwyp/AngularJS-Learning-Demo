
function UnauthorizedAccessError(code, message, field) {
    Error.captureStackTrace(this, this.constructor);

    this.type = "UserLevelOperationalError";
    this.name = "UnauthorizedAccessError";
    this.message = message || "Unauthorized Access Token";

    this.code = code || 403;
    this.field = field || "unknownfield";
    this.status = 403;
}

UnauthorizedAccessError.prototype = Object.create(Error.prototype);
UnauthorizedAccessError.prototype.constructor = UnauthorizedAccessError;

module.exports = UnauthorizedAccessError;
