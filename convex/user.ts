import { mutation } from "./_generated/server";

export const createUser=mutation({args:{},handler:async(ctx,args)=>{
let user=await ctx.auth.getUserIdentity()
if(user)
{ 
    let check=await ctx.db.query("users").withIndex("by_email",(q)=>q.eq("email",user.email

    )).collect();
   
    if(!check.length)
    {
         
        await ctx.db.insert("users",{id:user.tokenIdentifier,email:user.email,url:user.pictureUrl
    })
    }

}


}})