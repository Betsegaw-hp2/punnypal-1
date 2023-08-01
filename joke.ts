import { Context } from 'grammy';
import axios from 'axios';

const joke = async (ctx : Context) => {
  const jokePrompt = ctx.match;
  let param = '';
  
  if (jokePrompt == '') {
    await ctx.reply("tip: you can search for joke using \n `/joke <type here>`", {parse_mode: "MarkdownV2" });
  } else param =  `?contains=${jokePrompt}`;

  const response = await axios.get('https://v2.jokeapi.dev/joke/Any'+param);
  const data = await response.data;

  if (data.error) {
    console.log(`Error code ${data.code}: caused by "${data.causedBy}"`);
    await ctx.reply(data.message);
    return;
  }

  const txt = `Catagory: _${data.category}_ \n*Here is your Joke*: \n`;
   await ctx.reply(txt,{parse_mode:"MarkdownV2"});
  if (data.type == 'twopart') {
    await ctx.reply(data.setup);
    const delay = Math.max(data.setup.length * 50, 2000); // min 2 sec
    setTimeout(() => { ctx.reply(data.delivery) }, delay); 
  } else {
    await ctx.reply(data.joke);
  }
}

export default joke;