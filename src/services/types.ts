export interface RegisterResponseType {
  accessToken: string;
  refreshToken: string;
  user: UserType;
}

export interface UserType {
  email: string;
  id?: string;
  name?: string;
  password?: string;
  provider?: string;
  sex: "female" | "male" | "other";
}
