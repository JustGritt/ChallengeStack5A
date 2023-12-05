import { UserData } from "./utils/Types";
import { EndT, Endpoint, api } from "./utils/apiUtils";

const endpoints = new Endpoint()
let instance: User

export class User {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
    }

    async SignUp(user: UserData) {
        console.log(user)
        try {
            const { data, status } = await api.post(
                endpoints.getEndpoint(EndT.register), { user }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async Login(email: string, password: string) {
        try {
            const { data, status } = await api.post(
                endpoints.getEndpoint(EndT.login), { email, password }
            )
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
}

const user = new User()
export default user