import Axios from "axios"

export const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export enum EndT {
    register,
    login
}

export class Endpoint {
    private [EndT.register]: string = '/register'
    private [EndT.login]: string = '/login'
    
    public getEndpoint(type: EndT, id?: string) {
        return this[type].replace(':id', id || '')
      }
}
