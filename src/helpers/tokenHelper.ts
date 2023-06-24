import crypto from 'crypto';

export function generateRandomToken(){
    return crypto.randomBytes(20).toString('hex');
}
export function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}