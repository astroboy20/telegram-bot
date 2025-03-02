import { Telegraf } from "telegraf"
import dotenv from "dotenv"
dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN || ""

if (!BOT_TOKEN) {
    throw new Error("Bot token is missing")
}
const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply("Welcome! send me a group order link to begin, Paste ad lets fucking go")
})

bot.launch().then(() => {
    console.log("Bot is running")
}).catch((err) => {
    console.log(err)
})

