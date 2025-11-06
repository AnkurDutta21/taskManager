import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Message, MessageType } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UploadFileResponseDto } from './dto/upload-file.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async createMessage(
    chatId: number,
    userId: number,
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const chat = await this.chatsRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }

    const message = this.messagesRepository.create({
      ...createMessageDto,
      chatId,
      userId,
      type: createMessageDto.file ? MessageType.FILE : MessageType.TEXT,
    });

    return await this.messagesRepository.save(message);
  }

  async getMessages(chatId: number): Promise<Message[]> {
    const chat = await this.chatsRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }

    return await this.messagesRepository.find({
      where: { chatId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });
  }

  async uploadFile(
    chatId: number,
    file: any,
  ): Promise<UploadFileResponseDto> {
    const chat = await this.chatsRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }

    // In a real application, you would upload to S3, Azure Blob, etc.
    // For now, we'll return a mock response
    const fileUrl = `/uploads/${Date.now()}-${file.originalname}`;

    return {
      fileUrl,
      fileName: file.originalname,
      fileSize: file.size,
      fileType: file.mimetype,
    };
  }

  async deleteMessage(chatId: number, messageId: number): Promise<void> {
    const message = await this.messagesRepository.findOne({
      where: { id: messageId, chatId },
    });

    if (!message) {
      throw new NotFoundException(
        `Message with ID ${messageId} not found in chat ${chatId}`,
      );
    }

    await this.messagesRepository.remove(message);
  }

  async getChatFiles(chatId: number): Promise<Message[]> {
    const chat = await this.chatsRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }

    return await this.messagesRepository.find({
      where: { chatId, type: MessageType.FILE },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
