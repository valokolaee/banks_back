// src/services/user.service.ts
import { models } from '../db';
import Chat from '../models/chat.model';

export class ChatService {
  /**
     * @param userId 
     */
  static async getAll(userId: number) {
    try {
      const chats = await models.Chat.findAll({
        where: { userId },
        order: [['createdAt', 'DESC'],],
      })


      return chats
    } catch (error) {
      return error
    }

  }
  /**
     * @param userId 
     */
  static async create(chat: Partial<Chat>) {
    // return ''
    try {
      const _chat:Chat = await models.Chat.create(chat)

      // console.log('chats', chat);

      return _chat
    } catch (error) {
      return error
    }

  }




}

