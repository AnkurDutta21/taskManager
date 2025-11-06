import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('chats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post(':chatId/messages')
  createMessage(
    @Param('chatId') chatId: string,
    @Request() req,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.chatsService.createMessage(
      +chatId,
      req.user.userId,
      createMessageDto,
    );
  }

  @Get(':chatId/messages')
  getMessages(@Param('chatId') chatId: string) {
    return this.chatsService.getMessages(+chatId);
  }

  @Post(':chatId/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(
    @Param('chatId') chatId: string,
    @UploadedFile() file: any,
  ) {
    return this.chatsService.uploadFile(+chatId, file);
  }

  @Delete(':chatId/messages/:messageId')
  deleteMessage(
    @Param('chatId') chatId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.chatsService.deleteMessage(+chatId, +messageId);
  }

  @Get(':chatId/files')
  getChatFiles(@Param('chatId') chatId: string) {
    return this.chatsService.getChatFiles(+chatId);
  }
}
