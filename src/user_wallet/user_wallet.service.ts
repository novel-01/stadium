import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { UserWallet } from './models/user_wallet.model';

@Injectable()
export class UserWalletService {
  constructor (@InjectModel(UserWallet) private userWalletRepository: typeof UserWallet) {}

  async create(createUserWalletDto: CreateUserWalletDto) {
    const userWallet = await this.userWalletRepository.findOne({where: {userId: createUserWalletDto.userId}})
    if (userWallet) {
      throw new BadRequestException('Wallet already exists')
    }
    return this.userWalletRepository.create(createUserWalletDto);
  }

  async addMoneyToWallet(amount: number) {
    return this.userWalletRepository
  }

  findAll() {
    return this.userWalletRepository.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.userWalletRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateUserWalletDto: UpdateUserWalletDto) {
    return this.userWalletRepository.update(updateUserWalletDto, {where: {id}, returning: true})[1][0];
  }

  remove(id: number) {
    return this.userWalletRepository.destroy({where: {id}});
  }
}
