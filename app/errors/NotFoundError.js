
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
 */


function NotFoundError(code, message) {
    // Error.call(this, typeof error === "undefined" ? undefined : error.message);
    Error.captureStackTrace(this, this.constructor);

    this.type = "UserLevelOperationalError";
    this.name = "NotFoundError";
    this.message = message || "Requested Page Not Found";

    this.code = code || "404";
    this.status = 404;
    // this.inner = error;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;
