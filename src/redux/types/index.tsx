export interface SocialUser {
  name: string;
  email: string;
  image?: string;
  provider: 'google' | 'facebook';
}

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}
export type SignInSuccessResponse = {
  idToken: string | null;
  serverAuthCode?: string | null;
  scopes?: string[];
  user: User; // <- This is the actual Google user info
};

interface User {
  id: string;
  email: string;
  name?: string;
  photo?: string;
}
export interface LoginResponse {
  data: {
    tokens: {
      access_token: string;
      refresh_token: string;
    };
    user: any;
  };
}

export interface FacebookGraphResult {
  email?: string;
  name?: string;
  picture?: {
    data?: {
      url?: string;
    };
  };
}
