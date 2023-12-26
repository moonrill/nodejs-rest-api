import bcrypt from 'bcrypt'

// Encode
export const hashing = (password: string) => {
  return bcrypt.hashSync(password, 10)
}
