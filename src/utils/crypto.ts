import CryptoJS from 'crypto-js';

const AES_SECRET_KEY = String(process.env.EXPO_PUBLIC_DECRYPT_KEY); 

export const encryptAES = (text: string): string => {
  return CryptoJS.AES.encrypt(text, AES_SECRET_KEY).toString();
};

export const decryptAES = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, AES_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
