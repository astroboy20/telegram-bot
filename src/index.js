"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
const storeChecker_1 = require("./services/storeChecker");
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
const extractDoorDashLink = (text) => {
    const urlRegex = /(https?:\/\/(?:www\.)?(?:doordash\.com|order\.online|drd\.sh)\/[^\s]+)/i;
    const match = text && text.match(urlRegex);
    return match ? match[0] : null;
};
bot.on("text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const messageText = ctx.message.text;
    if (messageText.includes("doordash.com") || messageText.includes("order.online") || messageText.includes("drd.sh")) {
        const storeName = extractDoorDashLink(messageText);
        const isListed = yield (0, storeChecker_1.isStoreListedOnOrderOnline)(storeName);
        if (isListed) {
            ctx.reply(`Good news! "${storeName}" appears to be listed on order.online.`);
        }
        else {
            ctx.reply(`Sorry, "${storeName}" does not seem to be listed on order.online.`);
        }
    }
    else {
        ctx.reply('Please send a valid DoorDash group order link.');
    }
}));
