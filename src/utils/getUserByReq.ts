// src/controllers/auth.controller.ts
import IRequest from '../types/IRequest';
import IUser from '../types/IUser';


export default (req: IRequest ): IUser => {
 


  return req!?.user!.get({ plain: true });
}
