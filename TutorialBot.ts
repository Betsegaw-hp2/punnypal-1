import { Bot} from "grammy";
 import meme from "./meme";
import advice from "./advice";
import joke from "./joke";

const botToken = process.env['BOT_TOKEN'];
//Create a new bot
const bot = new Bot(`${botToken}`);

const commands = [
  '/joke - Get a random joke',
  '/advice - Get a random advice',
  '/meme - Get a random meme',
  '/help - Show this help menu'
];

bot.command('start', async (ctx) => {
  // Send a welcome message to the user with the inline keyboard
  const message = 'Welcome to punnypal!  Type /help to see all available commands.';
  await ctx.reply(message);
});


bot.command("help", async (ctx) => {
  const message = commands.join('\n');
  await ctx.reply(message, { parse_mode: 'HTML' });
});

bot.command("meme", async (ctx) => meme(ctx));

bot.command("advice", async (ctx) => advice(ctx));

bot.command("joke", async (ctx) => joke(ctx));


//This function would be added to the dispatcher as a handler for messages coming from the Bot API
bot.on("message", async (ctx) => {
  //Print to console
  console.log(
    `${ctx.from.first_name} wrote ${"text" in ctx.message ? ctx.message.text : ""
    }`);

    //This is equivalent to forwarding, without the sender's name
    await ctx.copyMessage(ctx.message.chat.id);
});

//Start the Bot
bot.start();
