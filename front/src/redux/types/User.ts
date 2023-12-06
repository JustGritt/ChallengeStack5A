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