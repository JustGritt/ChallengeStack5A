export interface ApiSuccessBase<T> {
    data: T
}


export type ApiErrorResponse = {
    data: ApiErrorData,
    status: number
}

export type ApiErrorData = {
    "@id": string,
    "@type": string,
    "status": number,
    "violations": Array<ApiErrorViolations>,
    "detail": string,
    "hydra:title": string,
    "hydra:description": string,
    "type": string,
    "title": string
}


export type ApiErrorViolations = {
    propertyPath: string,
    message: string,
    code: string
}