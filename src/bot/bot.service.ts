import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from 'src/app.constants';
import { Context, Telegraf, Markup } from 'telegraf';
import { Bot } from './models/bot.model';


@Injectable()
export class BotService {
 constructor (
    @InjectModel(Bot) private botRepository: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
 ) {}

 async start(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botRepository.findOne({
        where: { user_id: userId},
    })
    if (!user) {
        await this.botRepository.create({
            user_id: userId,
            first_name: ctx.from.first_name,
            last_name: ctx.from.last_name,
            username: ctx.from.username
        })
        await ctx.reply('Please <b>Send Phone Number</b> tugmasini bosing', {
            parse_mode: "HTML",
            ...Markup.keyboard([
                [Markup.button.contactRequest('Send Phone Number')],
            ])
            .oneTime()
            .resize(),
        })
    } else if (!user.status) {
        await ctx.reply('Please <b>Send Phone Number</b> tugmasini bosing', {
            parse_mode: "HTML",
            ...Markup.keyboard([
                [Markup.button.contactRequest('Send Phone Number')],
            ])
            .oneTime()
            .resize(),
        })
    }
    else {
        await this.bot.telegram.sendChatAction(userId, 'typing');
        await ctx.reply('Connecttion has been set with this bot', {
            parse_mode: 'HTML',
            ...Markup.removeKeyboard(),
        })
    }
}

async onContact(ctx: Context) {    
    if('contact' in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botRepository.findOne( {where: {user_id: userId}} );
      
      if( !user )  ctx.reply( '<b>Start</b> tugmasini bosing!', {parse_mode: 'HTML', ...Markup.keyboard([['/start']]).oneTime().resize()} );

      else if ( ctx.message.contact.user_id != userId )  ctx.reply( 'Ozingizni raqamingizni kiriting!', {parse_mode: 'HTML', ...Markup.keyboard([[Markup.button.contactRequest('Telefon raqamni yuborish')]]).oneTime().resize() });
    
      else {
        let phone: string;
        ctx.message.contact.phone_number[0] == '+' ? (phone = ctx.message.contact.phone_number) : (phone = '+' + ctx.message.contact.phone_number);

        await this.botRepository.update( {phone_number: phone, status: true}, {where: {user_id: userId}} );

        await ctx.reply('Ro\'yhatdan o\'tdingiz!', { parse_mode: 'HTML', ...Markup.removeKeyboard() });
      }
    }
  }

  async onStop(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botRepository.findOne( {where: {user_id: userId}} );

    if (user.status) await this.botRepository.update( {status: false, phone_number: null }, { where: { user_id: userId } } );

    await ctx.reply( 'Botdan chiqdiz', {parse_mode: 'HTML', ...Markup.keyboard([['/start']]).oneTime().resize()} );
  }
  async sendOTP(phoneNumber: string, OTP: string): Promise<boolean> {
    const user = await this.botRepository.findOne( {where: {phone_number: phoneNumber} });

    if(!user || !user.status) return false;

    await this.bot.telegram.sendChatAction(user.user_id, 'typing');
    await this.bot.telegram.sendMessage(user.user_id, 'Verify code: ' + OTP);
    return true;
  }

}
