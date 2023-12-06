import Axios from "axios"

export const api = Axios.create({
    baseURL: 'http://localhost:3000/api',
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
