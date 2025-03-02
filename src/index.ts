import { Telegraf } from "telegraf"

const BOT_TOKEN = "7273320452:AAFN3Qdb0o4H6Iysb8JI9d112g_IyfaSizs"
const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply("Welcome! send me a group order link to begin")
})

bot.launch().then(() => {
    console.log("Bot is running")
}).catch((err) => {
    console.log(err)
})

