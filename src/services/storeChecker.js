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
exports.isStoreListedOnOrderOnline = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Checks if a store is "listed" on order.online by searching Google.
 *
 * @param storeName - The name of the store/restaurant.
 * @returns A boolean indicating whether the store is found on order.online.
 */
const isStoreListedOnOrderOnline = (storeName) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = process.env.GOOGLE_CSE_API_KEY;
    const cx = process.env.GOOGLE_CSE_ID;
    if (!apiKey || !cx) {
        throw new Error("Google CSE API key or ID is missing");
    }
    const query = encodeURIComponent(`${storeName} doordash site:order.online`);
    const url = `https://customsearch.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;
    try {
        const response = yield axios_1.default.get(url);
        const items = response.data.items || [];
        for (const item of items) {
            const link = item.link || "";
            const snippet = item.snippet || "";
            if (link.includes("order.online") || snippet.includes("order.online")) {
                return true;
            }
        }
        return false;
    }
    catch (error) {
        console.error(error);
        return false;
    }
});
exports.isStoreListedOnOrderOnline = isStoreListedOnOrderOnline;
