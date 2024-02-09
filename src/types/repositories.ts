import { User } from ".";

export interface PrimaryLanguage {
    name: string;
  }
  
  export interface Repository {
    name: string;
    description: string;
    url: string;
    primaryLanguage: PrimaryLanguage;
    stargazerCount: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface PullRequest {
    title: string;
    createdAt: string;
    url: string;
  }
  
  export interface Issue {
    title: string;
    createdAt: string;
    url: string;
  }
  
  
  export interface GetUserReposResponse {
    user: User;
  }
  