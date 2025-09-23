// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import getUserByReq from '../utils/getUserByReq';
import { IResponse } from '../types/IRequest';

export class UserController {
  /**
   * آپدیت عکس پروفایل کاربر
   */
  static async updateProfileImage(req: Request, res: Response) {
    try {
      // const { userId } = req.params;
      const userId = getUserByReq(req, res).id;

      const { profileImage } = req.body;

      if (!profileImage) {
        return res.status(400).json({
          success: false,
          message: 'Profile image path is required'
        });
      }

      const success = await UserService.updateProfileImage(parseInt(userId), profileImage);

      if (success) {
        res.json({
          success: true,
          message: 'Profile image updated successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found or update failed'
        });
      }

    } catch (error) {
      console.error('Error in updateProfileImage:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }


  /**
   * گرفتن اطلاعات کاربر
   */
  static async getUserProfile(req: Request, res: Response) {

    try {
      const userId = getUserByReq(req, res).id;

      if (userId === undefined) {
        res.status(400).json({
          success: false,
          message: 'bad request'
        });
      }
      const user = await UserService.getUserById(parseInt(userId));

      if (user) {
        res.json({
          success: true,
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

    } catch (error) {
      console.error('Error in getUserProfile:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * گرفتن اطلاعات کاربر
   */
  static async getUserInvestments(req: Request, res: IResponse) {

    try {

      const userId = getUserByReq(req, res).id;

      if (userId === undefined) {
        res.status(400).json({
          success: false,
          message: 'bad request'
        });
      }

      const user = await UserService.getUserInvestmentsById(parseInt(userId));


      if (user) {
        res.json({
          success: true,
          message: 'not ready',
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

    } catch (error) {
      console.error('Error in getUserInvestments:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * گرفتن اطلاعات کاربر
   */
  static async getUserReferrals(req: Request, res: Response) {
    // res.send('getUserInvestments ok');
    try {
      const userId = getUserByReq(req, res).id;

      if (userId === undefined) {
        res.status(400).json({
          success: false,
          message: 'bad request'
        });
      }
      const user = await UserService.getUserReferralsById(parseInt(userId));

      if (user) {
        res.json({
          success: true,
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

    } catch (error) {
      console.error('Error in getUserInvestments:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * گرفتن اطلاعات کاربر
   */
  static async getUserLoans(req: Request, res: Response) {
    // res.send('getUserInvestments ok');
    try {
      const userId = getUserByReq(req, res).id;

      if (userId === undefined) {
        res.status(400).json({
          success: false,
          message: 'bad request'
        });
      }
      const user = await UserService.getUserLoansById(parseInt(userId));

      if (user) {
        res.json({
          success: true,
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

    } catch (error) {
      console.error('Error in getUserInvestments:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }


  /**
   * گرفتن اطلاعات کاربر
   */
  static async getBankAffiliations(req: Request, res: Response) {
    // res.send('getUserInvestments ok');
    try {
      const userId = getUserByReq(req, res).id;

      if (userId === undefined) {
        res.status(400).json({
          success: false,
          message: 'bad request'
        });
      }
      const user = await UserService.getBankAffiliations(parseInt(userId));

      if (user) {
        res.json({
          success: true,
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

    } catch (error) {
      console.error('Error in getUserInvestments:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }





  /**
   * آپدیت اطلاعات کاربر
   */
  static async updateUserProfile(req: Request, res: Response) {
    try {
      const userId = getUserByReq(req, res).id;
      const updateData = req.body;

      const success = await UserService.updateUser(parseInt(userId), updateData);

      if (success) {
        res.json({
          success: true,
          message: 'User profile updated successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found or update failed'
        });
      }

    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}