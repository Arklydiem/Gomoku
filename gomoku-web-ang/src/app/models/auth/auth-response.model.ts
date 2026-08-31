import {UserModel} from '../user.model';

export interface AuthResponseModel {
  accessToken: string;
  user: UserModel;
}
