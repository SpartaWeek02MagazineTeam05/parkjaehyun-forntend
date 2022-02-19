import { atom } from "recoil";


export const isLogin = atom<number>({
  key: "loginkey",
  default: 0,
});
