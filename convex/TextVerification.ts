
"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenAI } from "@google/genai";
import { api } from "./_generated/api";

export const verifyText = action({
  args:{chatid:v.string(),msg:v.string(),msgId:v.string()
  },
  handler: async (ctx, args) => {
    const ai = new GoogleGenAI({
      apiKey: process.env.f,
    });
    console.log("helllo bhai")

    try
    {
      const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Determine whether the provided text is AI-generated. Respond strictly in the format:Answer: Yes/No Confidence: (0–1 score) input text :"+args.msg,
    });
    console.log(response.text)
    console.log(JSON.parse(response.text??"")+"asdfkljaslkdfaslk")
    await ctx.runMutation(api.chat.updateMsgAi,{chatid:args.chatid,msgid:args.msgId,result:response.text??""})

    }
    catch(e)
    {
      console.log(e)
    }
  
  },
});