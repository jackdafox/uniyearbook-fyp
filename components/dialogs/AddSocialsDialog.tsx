"use client"
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import AddSocialForm from "../profile/AddSocialForm";

const AddSocialsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          Add Social Links
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden z-[100]">
        <h1 className="text-2xl tracking-tight font-semibold">Add Social Links</h1>
        <AddSocialForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddSocialsDialog;
