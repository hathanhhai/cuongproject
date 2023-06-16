import { EncryptStorage } from "encrypt-storage";
export const encryptStorage = new EncryptStorage(process.env.VUE_APP_ENCRYPT_LOCAL_STORAGE_KEY, {
  prefix: "@Coi_Cai_Quan_Que",
});
