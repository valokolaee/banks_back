// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { ChatService } from '../services/chat.service';
import getUserByReq from '../utils/getUserByReq';
import Chat from '../models/chat.model';
import { ContentService } from '../services/content.service';

export class ChatController {

  /**
   * گرفتن اطلاعات کاربر
   */
  static async getAll(req: Request, res: Response) {
    try {
      const userID = getUserByReq(req).id;
      const chats = await ChatService.getAll(userID)

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
      const { name } = req.body || {}
      const userId = getUserByReq(req).id;

      const _chat: any = await ChatService.create({ userId, name });
      const _content = await ContentService.create({userRoll:'user',  chatId: _chat.id, contentText: name });
      const _aiContent = await ContentService.create({ userRoll:'assistant',  chatId: _chat.id, contentText: 'we are working on your question as asked'+name+'\n *thanks for your patience' });



      res.json({
        success: true,
        data:{content: _aiContent,chat:_chat}
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