import { Module } from '@nestjs/common';
import { UserCardService } from './user_card.service';
import { UserCardController } from './user_card.controller';

@Module({
  controllers: [UserCardController],
  providers: [UserCardService],
})
export class UserCardModule {}
