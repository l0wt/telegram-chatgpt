import { Bot } from "grammy";
import { ChatGPTAPI, ChatMessage } from "chatgpt";
import dotenv from "dotenv";
import { run } from "@grammyjs/runner";

export const bot = new Bot(process.env.BOT_TOKEN!);

dotenv.config();

const api = new ChatGPTAPI({
  apiKey: process.env.CHATGPT_API_KEY!,
});

// Mapping from number to last conversation id
const conversations: { [key: number]: any } = {};

bot.on("message", async (ctx) => {
  if (ctx.message?.text) {
    try {
      const lastConversation = conversations[ctx.message.from.id];
      console.log(
        "[ChatGPT] Parsed prompt from " +
          ctx.message.from.id +
          ": " +
          ctx.message.text
      );
      let response: ChatMessage;
      const start = Date.now();

      if (lastConversation) {
        response = await api.sendMessage(ctx.message.text, lastConversation);
      } else {
        response = await api.sendMessage(ctx.message.text);
      }

      const end = Date.now() - start;

      console.log(
        "[ChatGPT] Answer to " + ctx.message.from.id + ": " + response.text
      );

      conversations[ctx.message.from.id] = {
        conversationId: response.conversationId,
        parentMessageId: response.id,
      };

      console.log("[ChatGPT] ChatGPT response generation took " + end + "ms");

      await ctx.reply(response.text);
    } catch {
      await ctx.reply("An error occured, please try again later.");
    }
  }
});

run(bot);