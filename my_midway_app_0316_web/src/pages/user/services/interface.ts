export interface userProps {
  name: string;
  email: string;
  password: string;
  rememberToken?: any;
}

export interface queryUserProps {
  pageSize: number;
  pageNumber: number;
  [propsName: string]: any;
}
