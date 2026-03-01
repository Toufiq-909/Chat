import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Id } from "./_generated/dataModel";
export const createChat=mutation({args:{participants:(v.string())},handler:async(ctx,args)=>{

    let user=await ctx.auth.getUserIdentity();
    if(user)
    {
        console.log("dsfasfd")

        let existingchatstatus=await ctx.db.query("chats")
            .filter((q) => q.eq(q.field("participants"), args.participants)).first()
            console.log(existingchatstatus)
        


     
       if(!existingchatstatus)
       {
        console.log("sai ram")
        let result=await ctx.db.insert("chats",{participants:args.participants,messages:[]})
      console.log(result)
      return result
       }
       else
       {
        return existingchatstatus._id
       }
       
    }
    else
    {
        throw new Error("Unauthorized User")
    }
    
}})

export const createMessage=mutation({args:{chatid:v.string(),msg:v.string(),sender:v.string()
    },handler:async(ctx,args)=>{

         let user=await ctx.auth.getUserIdentity();
    if(user)
    {
       if(args.chatid.length>0)
       {
         console.log("hi")
        console.log(args)
         let message={msgId:crypto.randomUUID(),msg:args.msg,sender:args.sender,timestamp:Date.now().toString()}
         const oldmessage=await ctx.db.get(args.chatid as Id<"chats">)
         await ctx.db.patch("chats",args.chatid as Id<"chats">,{messages:[...(oldmessage?.messages??[]),message]})
       }
        
    }
    else
    {
        throw new Error("Unauthorized User")
    }


}})

export const getMessage=query({args:{chatid:(v.string())},handler:async(ctx,args)=>{

        let user=await ctx.auth.getUserIdentity();
    if(user )
    {
        console.log(args.chatid+"sdfg")
      if(args.chatid?.length>0)
      {
          let result=await ctx.db.get(args.chatid as Id<"chats">);
          console.log("isndie"+args.chatid+result)
        return result?.messages;

      }
    }
    else
    {
        throw new Error("Unauthorized User")
    }

    
}})


export const getChats=query({args:{username:v.string()},handler:async(ctx,args)=>{
    let user=await ctx.auth.getUserIdentity();
    if(user)
    {
        console.log("HI i got called" +args.username)
        let results=await ctx.db.query("chats")
        .withSearchIndex("search_participants",(q)=>q.search("participants",args?.username))
        .collect();
        console.log(results);
        return results

    }
    else
    {
        throw new Error("unauthorized user")
    }
}})