
/**
 * Node Custom Error
 *
 * https://gist.github.com/justmoon/15511f92e5216fa2624b
 *
 * http://www.bennadel.com/blog/2828-creating-custom-error-objects-in-node-js-with-error-capturestacktrace.htm
 *
 * https://github.com/shutterstock/node-common-errors
 *
 * https://matoski.com/article/jwt-express-node-mongoose/
 *
 * https://www.joyent.com/developers/node/design/errors
 */



function SystemError(code, message, error) {
    // Error.call(this, typeof error === "undefined" ? undefined : error.message);
    Error.captureStackTrace(this, this.constructor);

    this.type = "SystemLevelOperationalError";
    this.name = "SystemError";
    this.message = message || "System Operational Error";

    this.code = code || 500;
    this.status = 500;

    this.inner = error;
}

SystemError.prototype = Object.create(Error.prototype);
SystemError.prototype.constructor = SystemError;

module.exports = SystemError;
