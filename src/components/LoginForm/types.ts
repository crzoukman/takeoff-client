
export interface ILoginUserData {
  username: string;
  password: string;
}


export interface ILoginForm {
  setIsError: (arg: boolean | null) => void;
  setErrorCode: (arg: number | null) => void;
}
