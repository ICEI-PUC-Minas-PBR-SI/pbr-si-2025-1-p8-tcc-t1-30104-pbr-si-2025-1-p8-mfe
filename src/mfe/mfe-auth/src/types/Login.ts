export interface ILoginParams {
  email: string;
  password: string;
}

export type TLoginHandler = (email?: string, password?: string) => void;
