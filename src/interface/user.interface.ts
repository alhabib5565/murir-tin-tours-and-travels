
type Iuser = {
    name: string,
    email: string,
    password: string
    passwordChangeAt: Date
    age: number,
    userPhoto: string,
    role: 'user' | 'admin',
    userStatus: 'active' | 'inactive'
}

export { Iuser }