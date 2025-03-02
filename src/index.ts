import { Telegraf } from "telegraf"
import dotenv from "dotenv"
import { isStoreListedOnOrderOnline } from "./services/storeChecker"
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


const extractDoorDashLink = (text: string | any) => {
    const urlRegex = /(https?:\/\/(?:www\.)?(?:doordash\.com|order\.online|drd\.sh)\/[^\s]+)/i;
    const match = text && text.match(urlRegex)
    return match ? match[0] : null
}

bot.on("text", async (ctx) => {
    const messageText = ctx.message.text

    if (messageText.includes("doordash.com") || messageText.includes("order.online") || messageText.includes("drd.sh")) {
        const storeName = extractDoorDashLink(messageText)

        const isListed = await isStoreListedOnOrderOnline(storeName)
        if (isListed) {
            ctx.reply(`Good news! "${storeName}" appears to be listed on order.online.`);
        } else {
            ctx.reply(`Sorry, "${storeName}" does not seem to be listed on order.online.`);
        }
    } else {
        ctx.reply('Please send a valid DoorDash group order link.');
    }

})