import { atom } from "recoil";

export const isLogin = atom<number>({
  key: "loginkey",
  default: 0,
});
export interface IpostList {
  postId: number;
  nickName: string;
  contents: string;
  image: string;
  type: string;
  likeCount: number;
}

export const postListAtom = atom<IpostList[]>({
  key: "postlist",
  default: [
    {
      postId: 11,
      nickName: "gogo",
      contents: "asdfasdfasdfasdf",
      image:
        "https://www.korea.kr/newsWeb/resources/temp/images/000052/%EC%82%AC%EA%B3%BC_%EB%B3%B8%EB%AC%B8.jpg",
      type: "full",
      likeCount: 10,
    },
    {
      postId: 22,
      nickName: "ifizz",
      contents: "asdfasdfasdfasdf",
      image:
        "https://www.korea.kr/newsWeb/resources/temp/images/000052/%EC%82%AC%EA%B3%BC_%EB%B3%B8%EB%AC%B8.jpg",
      type: "full",
      likeCount: 13,
    },
  ],
});
export interface IUserInfo {
  username: string;
  nickName: string;
}

export const userInfo = atom<IUserInfo[]>({
  key: "userInfo",
  default: [],
});

// export enum IimgCategories {
//   "FULL",
//   "RIGHT",
//   "LEFT",
// }

// export const imgCategoryState = atom<IimgCategories>({
//   key: "imgCategory",
//   default: IimgCategories.FULL,
// });

export const likeList = atom<number[]>({
  key: "likeList",
  default:[]
})

