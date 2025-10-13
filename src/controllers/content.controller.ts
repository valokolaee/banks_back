// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { ContentService } from '../services/content.service';
import getUserByReq from '../utils/getUserByReq';

export class ContentController {

  /**
   * گرفتن اطلاعات کاربر
   */
  static async getAll(req: Request, res: Response) {
    try {

      const chatID = req.query.id?.toString()

      const chats = await ContentService.getAll(parseInt(chatID || '0'))

      res.json({
        success: true,
        data: chats
      });

    } catch (error) {
      console.error('Error in getting chats:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }


  /**
   * گرفتن اطلاعات کاربر
   */
  static async create(req: Request, res: Response) {
    try {
      const body = req.body || {}
console.log(body);

      const response = await ContentService.create(body);
      const _aiContent = await ContentService.create({ userRoll: 'assistant', chatId: body.chatId, contentText: 'we are working on your question as asked  "*' + body.contentText + '*"  \n *thanks for your patience*' });


      res.json({
        success: true,
        data: _aiContent
      });

    } catch (error) {
      console.error('Error in getUserProfile:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

}