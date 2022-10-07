import { hash } from 'bcryptjs'

export async function c_hashPw(password) {
    const hashDigest = await hash(password,12)
    return hashDigest;
}