export interface authInitialState {
  user: {
    username: string;
    email: string;
    id: string;
  } | null;
  isAuthenticated: boolean;
  accessToken: string;
}
