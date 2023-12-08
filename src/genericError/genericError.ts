

class GenericError extends Error {
    public statusCode: number

    constructor(messae: string, SCode: number) {
        super(messae)
        this.statusCode = SCode
        Error.captureStackTrace(this, this.constructor)
    }
}

export default GenericError