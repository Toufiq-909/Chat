import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser=mutation({args:{},handler:async(ctx,args)=>{
let user=await ctx.auth.getUserIdentity()
console.log(user);
if(user)
{ 
    let check=await ctx.db.query("users").withIndex("by_username",(q)=>q.eq("username",String(user.nickname||"")

    )).collect();
   
    if(!check.length)
    {
         
        await ctx.db.insert("users",{id:user.tokenIdentifier,username:String(user.nickname ?? ""),email:String(user.email ?? ""),url:String(user.pictureUrl ?? "")
    })
    }

}


}})

export const getUser=query({args:{user:v.string()},handler:async(ctx,args)=>{
    let validuser=await ctx.auth.getUserIdentity();
    if(validuser)
    {
        let searchedUsers:any[]=await ctx.db.query("users")
        .withSearchIndex("search_username",(q)=>q.search("username",String(args.user ?? ""))).collect();
        console.log(searchedUsers);
        let filteredusers=searchedUsers.filter(element=>element.username!=validuser.nickname)
        let result=filteredusers.map((x)=>{
            return (
                {username:x.username,img:x.url}
            )
        })
        return result;

    }
    else
    {
        throw new Error("Not Authenticated")
    }
}})