import { Role } from './role';

export class User {
  id: number;
  company_id:number;
  img: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  accessToken: string;
}
