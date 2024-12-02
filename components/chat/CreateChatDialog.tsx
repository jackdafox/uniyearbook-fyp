"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { User } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getInitials } from '../events/EventProfile'
import { createChat } from '@/utils/actions/chat'
import { toast } from '@/hooks/use-toast'

interface CreateChatDialogProps {
  users: User[]
}

const CreateChatDialog = ({ users }: CreateChatDialogProps) => {

  const handleClick = async (receipentUserID: number) => {
    const result = await createChat(receipentUserID)

    if (!result) {
      toast({ description: "Failed to create chat" })
    } else {
      toast({ description: "Successfully created chat" })
    }

  }
  return (
    <Dialog>
      <DialogTrigger><Button>Create Message</Button></DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <div key={user.id} className='flex gap-3'>
              <Avatar className="w-7 h-7">
                <AvatarImage
                  src={
                    user.profile_picture ? user.profile_picture : ""
                  }
                />
                <AvatarFallback>
                  {getInitials(user.first_name)}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-sm font-semibold">
                {user.first_name} {user.last_name}
              </h1>
              <Button onClick={() => handleClick(user.id)}>Chat</Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateChatDialog
