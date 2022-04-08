export interface IErrors {
  isError: boolean | null;
  errorCode: number | null;
  errorMsgs: { [k: string]: string };
}