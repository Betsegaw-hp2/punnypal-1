import { Context } from "grammy";
import axios from "axios";

const advice = async (ctx : Context) => {
  const jokePrompt: any = ctx.match;
  let urlParam = "/advice";
  let flag = false;
  
  if(jokePrompt == '') {
    await ctx.reply("tip: you can search advice using \n `/advice search_term`",{ parse_mode: "MarkdownV2" });
    flag = false;
  } else {
    urlParam += `/search/${jokePrompt}`;
    flag = true; 
  }
  
  const res = await axios.get(`https://api.adviceslip.com${urlParam}`);
  const data = await res.data;
  if (data.message?.type == "notice") {
    await ctx.reply(data.message.text + ' :(');
    return;
  }

  const result : string = flag ? data.slips.map((slip: any) => `- ${slip.advice}`).join('\n'): data.slip.advice;
  
  if(Array.isArray(result)) {
      await ctx.reply(result, { parse_mode: 'MarkdownV2' });
  } else await ctx.reply(result);
     
}

export default advice;