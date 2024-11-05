"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const socialNetworks = [
  "instagram",
  "youtube",
  "tiktok",
  "twitter",
  "facebook",
  "linkedin",
  "other",
];

const ProfileAddSocial = () => {
  const [socialLinks, setSocialLinks] = useState([
    { network: "instagram", username: "" },
  ]);

  const handleAddLink = () => {
    setSocialLinks([...socialLinks, { network: "instagram", username: "" }]);
  };

  const handleNetworkChange = (index: number, value: string) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index].network = value;
    setSocialLinks(newSocialLinks);
  };

  const handleUsernameChange = (index: number, value: string) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index].username = value;
    setSocialLinks(newSocialLinks);
  };

  return (
    <div>
      <form className="space-y-4">
        {socialLinks.map((link, index) => (
          <div key={index} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <Select
                defaultValue={link.network}
                onValueChange={(value) => handleNetworkChange(index, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Social Networks</SelectLabel>
                    {socialNetworks.map((network) => (
                      <SelectItem key={network} value={network}>
                        {network.charAt(0).toUpperCase() + network.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                placeholder="Username"
                value={link.username}
                onChange={(e) => handleUsernameChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={handleAddLink}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Another
        </Button>
      </form>
    </div>
  );
};

export default ProfileAddSocial;
