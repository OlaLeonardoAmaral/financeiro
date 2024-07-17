import axios from "axios"



export const Api = () => {
    return axios.create({
        baseURL: `${process.env.BACKEND_URL}/transacoes`
    });
}