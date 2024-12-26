import {
  Batch,
  Faculty,
  Major,
  Memory,
  Socials,
  Student,
  User,
} from "@prisma/client";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FaL } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";

interface ProfileCardProps {
  student: Student & {
    user: User & {
      socials: Socials[];
    };
  };
  batch: Batch & {
    major: Major;
    faculty: Faculty;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  student,
  batch,
}: ProfileCardProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative hover:scale-95 transition-all ease-in-out saturate-0 hover:saturate-100 flex flex-col items-start">
          <img
            src={
              student.user.profile_picture
                ? student.user.profile_picture
                : "https://placehold.co/320x288"
            }
            className="w-full sm:w-80 h-72 object-cover"
            alt={`${student.user.first_name}'s profile`}
          />
          <h1 className="text-lg sm:text-xl font-bold text-black mt-2 tracking-tight">
            {student.user.first_name} {student.user.last_name}
          </h1>
        </div>
      </DialogTrigger>
      <DialogContent className="border-0 p-0 w-full max-w-[90vw] md:max-w-[50rem] max-h-[50rem] overflow-y-scroll bg-zinc-900">
        <div className="flex flex-col items-center w-full relative">
          <div className="rounded-lg w-full relative">
            <img
              src={
                student.user.profile_picture
                  ? student.user.profile_picture
                  : "https://placehold.co/320x288"
              }
              className="object-contain w-full h-[20rem] rounded-t-lg relative bg-black"
              alt={`${student.user.first_name}'s profile`}
            />
          </div>
          <div className="p-6 w-full mb-10">
            <div className="flex gap-5 items-center">
              <h2 className="text-5xl font-bold mb-2 tracking-tighter text-white">
                {student.user.first_name} {student.user.last_name}
              </h2>
              <Link href={`/profile/${student.user.id}`}>
                <Button variant="outline" className="rounded-full">
                  View Profile
                </Button>
              </Link>
            </div>
            <p className="text-zinc-400 mb-4">
              {batch.faculty.name} | {batch.name}
            </p>
            <div className="space-y-4 mt-10">
              <div>
                <h3 className="font-semibold text-white">About me</h3>
                <p className="text-zinc-400">{student.user.details || "-"}</p>
              </div>
            </div>
            <div className="space-y-4 mt-10">
              <div>
                <h3 className="font-semibold text-white">Contact</h3>
                <p className="text-zinc-400">{student.user.contacts || "-"}</p>
              </div>
            </div>
            <div className="space-y-4 mt-10">
              <div>
                <h3 className="font-semibold text-white mb-2">Socials</h3>
                <div className="flex flex-col gap-2 items-start">
                  {student.user.socials.length > 0 ? (
                    student.user.socials.map((social) => (
                      <div className="flex items-center gap-2">
                        <FaLink className="text-zinc-400" />
                        <Link
                          key={social.id}
                          href={social.link}
                          className="text-zinc-400 hover:underline"
                        >
                          {social.name}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400">-</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCard;
