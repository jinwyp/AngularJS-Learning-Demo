
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


function PageNotFoundError(code, message) {
    // Error.call(this, typeof error === "undefined" ? undefined : error.message);
    Error.captureStackTrace(this, this.constructor);

    this.type = "UserLevelOperationalError";
    this.name = "PageNotFoundError";
    this.message = message || "Requested Page Not Found";

    this.code = code || 404;
    this.status = 404;
    // this.inner = error;
}

PageNotFoundError.prototype = Object.create(Error.prototype);
PageNotFoundError.prototype.constructor = PageNotFoundError;

module.exports = PageNotFoundError;
