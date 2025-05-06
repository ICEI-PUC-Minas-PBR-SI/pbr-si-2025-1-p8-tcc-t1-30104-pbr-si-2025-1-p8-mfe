export interface IUserProfile {
  createdAt: string;
  email: string;
  emailVerified: boolean;
  name: string;
  picture?: string | null;
  updatedAt: string;
  lastLogin: string;
  loginsCount: number;
}
