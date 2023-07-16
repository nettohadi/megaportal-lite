import { User } from './user';

export interface FileRemote {
  id: string;
  name:string;
  url:string;
  type:string;
  module:string;
  moduleId: string;
  uploader: string;
  createdAt: Date;
  user:User
}
