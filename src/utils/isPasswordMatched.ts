import bcrypt from 'bcrypt';
export const passwordMatched = (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainTextPassword, hashedPassword)
}