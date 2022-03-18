/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface OUerOptions {
  id?: number;
  name: string;
  password: string;
  email: string;
  rememberToken: string;
}

export interface OUerQueryOptions {
  pageSize: number;
  pageNumber: number;
}

export interface AdminOptions {
  username: string;
  pwd: string;
}
