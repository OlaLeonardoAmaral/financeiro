
export interface IUserCreate {
    name: string,
    email: string,
    firstName: string,
    secondName: string,
    password: string
}

export interface IUserResponse {
    token: string;
    user: {
        id: string,
        name: string,
        email: string,
        firstName: string,
        secondName: string,
        avatar: '/assets/avatar.png'
    }
}

export interface IUserResponseById {
    user: {
        id: string,
        name: string,
        email: string,
        firstName: string,
        secondName: string,
        avatar: '/assets/avatar.png'
    }
}

