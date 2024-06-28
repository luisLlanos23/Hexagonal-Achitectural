import { ErrorHandlingTypes } from './SystemExceptionCodes'

export class PackageException extends Error {
    public httpCode!: number | undefined
    public code!: string
    public details?: string

    constructor(
        errorKey: string,
        exceptions,
        details?: string
    ) {
        const error = exceptions?.[errorKey]
        super(error?.message ?? '')
        this.code = error?.code ?? ''
        this.details = details ?? ''
        this.httpCode = error?.httpCode
    }
}