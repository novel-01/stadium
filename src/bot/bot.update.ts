import { Action, Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import {Context, Markup} from 'telegraf'

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    return this.botService.start(ctx)
  }

  @On('contact')
    async onContact(@Ctx() ctx: Context) {
        return this.botService.onContact(ctx);
    }

    @Command('stop')
    async onStop(@Ctx() ctx: Context) {
        return this.botService.onStop(ctx)
    }

  // @Command('inline_keyboard')
  // async inlineButton(@Ctx() ctx: Context) {
  //   const inline_keyboard = [
  //     [
  //       {text: 'Button1', callback_data: 'button1'},
  //       {text: 'Button2', callback_data: 'button2'},
  //       {text: 'Button3', callback_data: 'button3'},
  //     ],
  //     [{text: 'Button4', callback_data: 'button4'}], 
  //     [{text: 'Button5', callback_data: 'button5'}], 
  //   ]
  //   ctx.reply('Choose a new inline button', {
  //     reply_markup: {
  //       inline_keyboard,
  //     }
  //   })
  // }

  // @Action(/button+[1-9]/g)
  // async onActionAnyButton(@Ctx() ctx: Context) {
  //   ctx.reply('You pressed any button!')
  // }
  // @Action('button1')
  // async onActionButton1(@Ctx() ctx: Context) {
  //   ctx.reply('You pressed Button 1!')
  // }
  // @Action('button2')
  // async onActionButton2(@Ctx() ctx: Context) {
  //   ctx.reply('You pressed Button 2!')
  // }  
  // @Action('button3')
  // async onActionButton3(@Ctx() ctx: Context) {
  //   ctx.reply('You pressed Button 3')
  // }  
  // @Action('button4')
  // async onActionButton4(@Ctx() ctx: Context) {
  //   ctx.reply('You pressed Button 4')
  // }  
  // @Action('button5')
  // async onActionButton5(@Ctx() ctx: Context) {
  //   ctx.reply('You pressed Button 5')
  // }


  // @Command('main_keyboard')
  // async onMainKeyboard(@Ctx() ctx: Context) {
  //   ctx.reply('Choose a <b>main</b> button', {
  //     parse_mode: 'HTML',
  //     ...Markup.keyboard([
  //       ['bir', 'ikki', 'uch'],
  //       ['tort'],
  //       [Markup.button.contactRequest('📞 Send Phone Number')],
  //       [Markup.button.locationRequest('📞 Send Location')],
  //       // [Markup.button.login.name],
  //     ])
  //     .oneTime()
  //     .resize(),
  //   })
  // }

  // @Hears('bir')
  // async onBirButton(@Ctx() ctx: Context) {
  //   ctx.reply('bir bosildi')
  // }

  // @Hears('ikki')
  // async onIkkiButton(@Ctx() ctx: Context) {
  //   ctx.reply('ikki bosildi')
  // }

  // @Hears('uch')
  // async onUchButton(@Ctx() ctx: Context) {
  //   ctx.reply('uch bosildi')
  // }

  // @Hears('tort')
  // async onTortButton(@Ctx() ctx: Context) {
  //   ctx.reply('tort bosildi')
  // }


  // @Command('info')
  // async infoCommand(@Ctx() ctx: Context) {
  //   await ctx.reply("Info Command");
  // }


  // @Hears('hi')
  // async hiHears(@Ctx() ctx: Context) {
  //   await ctx.reply("Hi there!");
  // }


  // @On('voice')
  // async onVoice(@Ctx() ctx: Context) {
  //   if ('voice' in ctx.message) {
  //     await ctx.reply(String(ctx.message.voice.duration))
  //   }
  // }

  // @On('invoice')
  // async onInVoice(@Ctx() ctx: Context) {
  //   if ('invoice' in ctx.message) {
  //     await ctx.reply(String(ctx.message.invoice.title))
  //   }
  // }

  // @On('document')
  // async onDocument(@Ctx() ctx: Context) {
  //   if ('document' in ctx.message) {
  //     await ctx.reply(String(ctx.message.document.file_name))
  //   } 
  // }

  // @On('location')
  // async onLocation(@Ctx() ctx: Context) {
  //   if ('location' in ctx.message) {
  //     await ctx.reply(String(ctx.message.location.latitude))
  //     await ctx.reply(String(ctx.message.location.longitude))
  //     await ctx.replyWithLocation(
  //       Number(ctx.message.location.latitude),
  //       Number(ctx.message.location.longitude),
  //     )
  //   }
  // }


  // @On('contact')
  // async onContact(@Ctx() ctx: Context) {
  //   if ('contact' in ctx.message) {
  //     await ctx.reply(String(ctx.message.contact.phone_number));
  //     await ctx.reply(String(ctx.message.contact.first_name));
  //     await ctx.reply(String(ctx.message.contact.last_name));
  //     await ctx.reply(String(ctx.message.contact.user_id));
  //   }
  // }

  // @On('sticker')
  // async onStick(@Ctx() ctx: Context) {
  //   if ('sticker' in ctx.message) { await ctx.reply('🤌'); }
  // }

  // @On('animation')
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ('animation' in ctx.message) { await ctx.reply('Animation'); }
  // }


  // @On('video')
  // async onVideo(@Ctx() ctx: Context) {
  //   if ('video' in ctx.message) {
  //     // console.log(ctx.message);
  //     await ctx.reply(String(ctx.message.video.file_name))
  //   }
  // }

  // @On('photo')
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ('photo' in ctx.message) {
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id),
  //     )
  //   }
  // }


  // @On('text')
  // async onText(@Ctx() ctx: Context) {
  //   // console.log(ctx.message);
  //   if ('text' in ctx.message) {
  //     if (ctx.message.text == 'salom') await ctx.reply("Hello Brother");
  //     else await ctx.reply(ctx.message.text)
  //   }
  // }

  // @On('message')
  // async onMessage(@Ctx() ctx: Context) {
  //   // console.log(ctx.botInfo);
  //   // console.log(ctx.chat.id);
  //   // console.log(ctx.chat.type);
  //   // if ('content' in ctx.message) { console.log(ctx.message); }
  // }

}
