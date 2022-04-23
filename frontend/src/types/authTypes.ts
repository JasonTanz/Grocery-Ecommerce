export interface authInitialState {
  user: {
    username: string;
  } | null;
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
}
