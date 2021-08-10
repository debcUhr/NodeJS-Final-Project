
export const errorMiddleware = (err, req, res, next) => {
    const { statusCode, message } = err;
    const errorMessage = setErrorMessage(statusCode, message)

    res.status(statusCode).json({
        Status: statusCode,
        Result: statusCode == 500 ? "Internal Error" : "Validation Error",
        ValidationMessages: errorMessage
    });
}

export const setErrorMessage = (status, customErr) => {
    const defaultErr = "Internal Error"

    switch (status) {
        case 400:
            return customErr ? customErr : 'Invalid object details.'
        case 404:
            return customErr ? customErr : `Object does not exists.`
        case 409:
            return customErr ? customErr : 'Object already exists.'
        default:
            return defaultErr
    }
}