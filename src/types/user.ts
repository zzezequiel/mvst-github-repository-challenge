export interface User {
    login: string;
    avatarUrl: string;
    name?: string;
    bio?: string;
    location?: string;
    email?: string;
    company?: string;
    followers?: {
      totalCount: number;
    };
    following?: {
      totalCount: number;
    };
  }
 
  export interface SearchUsersResponse {
    search: {
      nodes: User[];
    };
  }