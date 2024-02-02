enum Status {
    fail = "Failure",
    error = "Error",
    success = "Success"
}

export class AppError extends Error {
    statusCode: number;

    status: Status;

    // Errors caused by the user are operational
    isOperational: boolean;

    constructor(message: string, statusCode: number ){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.status = `${statusCode}`.startsWith("4") ? Status.fail : Status.error;

        Error.captureStackTrace(this, this.constructor);
    }
}