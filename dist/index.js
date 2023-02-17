var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Bot } from "grammy";
import { ChatGPTAPI } from "chatgpt";
import dotenv from "dotenv";
import { run } from "@grammyjs/runner";
export const bot = new Bot(process.env.BOT_TOKEN);
dotenv.config();
const api = new ChatGPTAPI({
    apiKey: process.env.CHATGPT_API_KEY,
});
// Mapping from number to last conversation id
const conversations = {};
bot.on("message", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text) {
        try {
            const lastConversation = conversations[ctx.message.from.id];
            console.log("[ChatGPT] Parsed prompt from " +
                ctx.message.from.id +
                ": " +
                ctx.message.text);
            let response;
            const start = Date.now();
            if (lastConversation) {
                response = yield api.sendMessage(ctx.message.text, lastConversation);
            }
            else {
                response = yield api.sendMessage(ctx.message.text);
            }
            const end = Date.now() - start;
            console.log("[ChatGPT] Answer to " + ctx.message.from.id + ": " + response.text);
            conversations[ctx.message.from.id] = {
                conversationId: response.conversationId,
                parentMessageId: response.id,
            };
            console.log("[ChatGPT] ChatGPT response generation took " + end + "ms");
            yield ctx.reply(response.text);
        }
        catch (_b) {
            yield ctx.reply("An error occured, please try again later.");
        }
    }
}));
run(bot);
