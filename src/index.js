"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BOT_TOKEN = process.env.BOT_TOKEN || "";
if (!BOT_TOKEN) {
    throw new Error("Bot token is missing");
}
const bot = new telegraf_1.Telegraf(BOT_TOKEN);
bot.start((ctx) => {
    ctx.reply("Welcome! send me a group order link to begin, Paste ad lets fucking go");
});
bot.launch().then(() => {
    console.log("Bot is running");
}).catch((err) => {
    console.log(err);
});
