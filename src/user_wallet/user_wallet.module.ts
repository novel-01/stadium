import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UserWalletService } from './user_wallet.service';
import { UserWalletController } from './user_wallet.controller';
import { UserWallet } from './models/user_wallet.model';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserWallet, User])
  ],
  controllers: [UserWalletController],
  providers: [UserWalletService],
})
export class UserWalletModule {}
