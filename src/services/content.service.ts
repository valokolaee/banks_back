// src/services/user.service.ts
import { models } from '../db';
import Chat from '../models/chat.model';
import Content from '../models/content.model';

export class ContentService {
  /**
     * @param userId 
     */
  static async getAll(chatId: number) {
    try {
      // await models.Content.
      const chats = await models.Content.findAll({
        where: {
          chatId
        }
      })

      console.log('chats', chats);

      return chats
    } catch (error) {
      return error
    }

  }
  /**
     * @param userId 
     */
  static async create(content: Partial<Content>) {
    try {
      
      const _chat = await models.Content.create(content)

      // console.log('chats', _chat);
      
      return _chat
    } catch (error) {
      console.log('error',error);
      
      return error
    }

  }




}

