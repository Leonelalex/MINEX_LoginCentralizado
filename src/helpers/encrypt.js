import CryptoJS from 'crypto-js';
import { encryptConstants } from '../constants'

export function encryptAES526(value) {
    const keySize = 256;
    const pass = encryptConstants.PASSWORDAES;
    const salt = CryptoJS.lib.WordArray.random(16);
    const key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: 100
    });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encrypted = CryptoJS.AES.encrypt(value, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    const result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
    return result;
}