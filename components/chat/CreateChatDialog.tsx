"use client";
import React from "react";
import { RiQuestionMark } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createChat } from "@/utils/actions/chat";
import { toast } from "@/hooks/use-toast";
import { FiPlus } from "react-icons/fi";
import { getInitials } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreateChatDialogProps {
  users: User[];
}

const CreateChatDialog = ({ users }: CreateChatDialogProps) => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleClick = async (receipentUserID: number) => {
    setLoading(true);
    const result = await createChat(receipentUserID);

    if (!result) {
      setLoading(false);
      toast({ description: "Failed to create chat" });
    } else {
      setLoading(false);
      toast({ description: "Successfully created chat" });
      setOpen(false); // Close dialog
      router.refresh();
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button className="w-full flex justify-center items-center">
          <FiPlus />
          <h1>Create Message</h1>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-96 overflow-y-auto border-0">
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle className="text-3xl tracking-tight">
            Add User
          </DialogTitle>
          <DialogDescription>
            Add a user to start a chat conversation
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-3 ">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="flex gap-3 items-center border rounded-md p-3 justify-between"
              >
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage
                      src={user.profile_picture ? user.profile_picture : ""}
                    />
                    <AvatarFallback>
                      {getInitials(user.first_name)}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="font-semibold">
                    {user.first_name} {user.last_name}
                  </h1>
                </div>
                <Button
                  className="justify-self-end w-32"
                  onClick={() => handleClick(user.id)}
                  disabled={loading}
                >
                  {loading && <Loader2 className="animate-spin" />}
                  {loading ? "Creating..." : "Message"}
                </Button>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-[20rem] gap-3 text-zinc-500">
              <RiQuestionMark size={100} />
              <h1 className="text-lg tracking-tight font-semibold">
                No users found
              </h1>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatDialog;
