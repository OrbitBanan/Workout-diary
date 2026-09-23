type LoginData = {
    email: string
    password: string
}

export function login(data: LoginData) {
    console.log('Login service:', data)

    return {
        message: 'Login succesful'
    }
}