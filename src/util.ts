import { createHash, randomBytes } from 'crypto';

export const getRandomUID = () => {
    const limit = 1000000
    return Math.ceil(Math.random() * limit)
}

export const generateOTP = () => {
    // return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
    const buffer = randomBytes(32)
    const otp = (
        parseInt(createHash("sha256").update(buffer).digest("hex"), 16) % 1000000
    ).toString().slice(0,6)
    const expiresAt = new Date(Date.now() + 60 * 1000); // 30 seconds
    return {
        otp: otp.padStart(6, "0"),
        expiresAt
    }
}