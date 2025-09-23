// src/controllers/auth.controller.ts
import { Response } from 'express';
import IRequest from '../types/IRequest';


export default (req: IRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
     });
  }


  return req?.user.get({ plain: true });
}
