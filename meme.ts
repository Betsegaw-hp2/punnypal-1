import { Context } from "grammy";
import axios from "axios";

const meme = async (ctx: Context) => {
  const memeTxt : any = ctx.match;
  if (memeTxt == '') {
    await ctx.reply("please provide a label/text");
    return;
  }
  // Fetch a random meme template
  const response: any = await axios.get("https://api.memegen.link/templates/");
  const data: any = await response.data;
  const templates = data.map((t: any) => t.id);

  // Generate a meme using the template and user text
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  const encodedText = encodeURIComponent(memeTxt);
  const generateUrl = `https://api.memegen.link/images/${selectedTemplate}/${encodedText}.jpg`;

  // Send the generated meme to the user
  await ctx.replyWithPhoto(generateUrl);
}

export default meme;