
type Iuser = {
    name: string,
    email: string,
    age: number,
    userPhoto: string,
    role: 'user' | 'admin',
    userStatus: 'active' | 'inactive'
}

export { Iuser }