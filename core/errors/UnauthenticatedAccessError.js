
function UnauthenticatedAccessError(code, message, field) {
    Error.captureStackTrace(this, this.constructor);

    this.type = "UserLevelOperationalError";
    this.name = "UnauthenticatedAccessError";
    this.message = message || "Unauthenticated Access Token";

    this.code = code || 401;
    this.field = field || "unknown field";
    this.status = 401;
}

UnauthenticatedAccessError.prototype = Object.create(Error.prototype);
UnauthenticatedAccessError.prototype.constructor = UnauthenticatedAccessError;

module.exports = UnauthenticatedAccessError;
