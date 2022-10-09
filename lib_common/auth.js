import { hash, compare } from 'bcryptjs'

export async function c_hashPw(password) {
    const hashDigest = await hash(password,12)
    return hashDigest;
}

export async function pwCanbeSameHarsh(password, hashDigest) {
    const canbeSame = await compare(password, hashDigest)
    return canbeSame
}