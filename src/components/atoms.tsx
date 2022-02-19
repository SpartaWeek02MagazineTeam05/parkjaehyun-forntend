import { atom } from "recoil";


export const isLogin = atom<number>({
  key: "loginkey",
  default: 0,
});

export interface IUserInfo{
  userName:string;
  password:string;
}

export const userInfo = atom<IUserInfo[]>({
  key: "userInfo",
  default: []

})
