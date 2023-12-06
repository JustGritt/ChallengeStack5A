export type User = {
    firstname: string
    lastname: string
    email: string
    confirmPassword: string
    plainPassword: string,
}

export type RegisterResponse = {
    "@context": "string",
    "@id": "string",
    "@type": "string",
    id: string,
    firstname: "string"
}


export type LoginResponse = {
    token: string,
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