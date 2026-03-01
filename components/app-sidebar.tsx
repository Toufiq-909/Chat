"use client"

import * as React from "react"
import {  Command, File,  Send, Trash2 } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs";
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { AvatarCircles } from "./ui/avatar-circles";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useChatStore } from "@/stores/chatstore";

// This is sample data
const data = {
  navMain: [
   {
      title: "Chats",
      icon: Send,
      isActive: true,
    },
    {
      title: "Drafts",
      icon: File,
      isActive: false,
    },
    ,
    
    {
      title: "Trash",
      icon: Trash2,
      isActive: false,
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  let user=useUser()
  let chats=useQuery(api.chat.getChats,{username:String(user.user?.username??"")})
  const { setOpen } = useSidebar()
    let setSelectedUser=useChatStore((state)=>state.setSelectedUser)
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <div>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Live Chat</span>
                    <span className="truncate text-xs">Messaging</span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item?.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item?.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)
                    
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item?.title}
                      className="px-2.5 md:px-2"
                    >
                      {
                        item &&
                        <item.icon />
                      }
                      <span>{item?.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <UserButton/>
          
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
             {chats?.map((el) => {

                          let time=new Date(parseInt(el.msg?.timestamp)).toLocaleString("en-IN",{dateStyle:"short",timeStyle:"short"})
                          if(time=="Invalid Date")
                          {
                            time=""
                          }


return (
  <div tabIndex={0} className={"flex items-center m-1 cursor-pointer rounded-sm bg-red900 h-[70px] mt-4 focus:bg-neutral-200 dark:focus:bg-neutral-800  hover:bg-neutral-200 dark:hover:bg-neutral-800"}
                                 onClick={()=>{
                                   setSelectedUser({username:el.name,img:el.img??"",chatid:el.chatid??""
                                   })
                                 }}>
                       
                                   <AvatarCircles className={"mr-4 ml-2 "}
                         numPeople={0}
                         avatarUrls={[
                           {
                             imageUrl: el.img??"",
                             profileUrl: "",
                           },
                         ]}
                       />
                       
                                 <div className={"bg-red900 w-[100%]"}>
          
                                      <div className={"flex bg-red900 justify-between w-[100%]"}>
                                <p>{el.name}</p>
                                <p className={"mr-4"}>{time}</p>
                               </div>
                               
                               <p>{el.msg?.msg}</p>
          
                                 </div>
                           
                               </div>
)





                        }
                       
                        )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
