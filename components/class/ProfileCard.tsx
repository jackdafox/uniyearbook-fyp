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
      memories: Memory[];
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
          <p className="text-sm sm:text-base text-gray-400 truncate">
            {student.user.details || "-"}
          </p>  
        </div>
      </DialogTrigger>
      <DialogContent
        closeIcon={false}
        className="border-0 p-0 w-full max-w-[90vw] md:max-w-[50rem] max-h-[90vh] overflow-auto bg-zinc-900 shadow-2xl"
      >
        <div className="flex flex-col items-center w-full relative">
          <div className="w-full relative">
            <img
              src={
                student.user.profile_picture
                  ? student.user.profile_picture
                  : "https://placehold.co/320x288"
              }
              className="object-cover w-full h-[15rem] sm:h-[20rem] relative bg-black"
              alt={`${student.user.first_name}'s profile`}
            />
          </div>
          <div className="p-4 sm:p-6 w-full mb-6 sm:mb-10">
            <div className="flex gap-3 sm:gap-5 items-start sm:items-center">
              <h2 className="text-3xl sm:text-5xl font-bold mb-2 tracking-tighter text-white">
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
            <div className="space-y-4 mt-6 sm:mt-10">
              <div>
                <h3 className="font-semibold text-white">About me</h3>
                <p className="text-zinc-400">{student.user.details || "-"}</p>
              </div>
            </div>
            <div className="space-y-4 mt-6 sm:mt-10">
              <div>
                <h3 className="font-semibold text-white">Contact</h3>
                <p className="text-zinc-400">{student.user.contacts || "-"}</p>
              </div>
            </div>
            <div className="space-y-4 mt-6 sm:mt-10">
              <div>
                <h3 className="font-semibold text-white mb-2">Socials</h3>
                <div className="flex flex-col gap-2 items-start">
                  {student.user.socials.length > 0 ? (
                    student.user.socials.map((social) => (
                      <div key={social.id} className="flex items-center gap-2">
                        <FaLink className="text-zinc-400" />
                        <Link
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
            <div className="space-y-4 mt-6 sm:mt-10">
              <h3 className="font-semibold text-white">Memories posted</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"></div>
              {student.user.memories.length > 0 ? (
                student.user.memories.map((memory) => (
                  <Link
                    href={`/class/${batch.id}/memories/${memory.id}`}
                    key={memory.id}
                  >
                    {memory.image_url &&
                    memory.image_url.match(/\.(jpg|png|jpeg|gif)$/) ? (
                      <img
                        src={
                          memory.image_url
                            ? memory.image_url
                            : "/default-profile.png"
                        }
                        className="rounded-xl w-full h-48 sm:h-72 lg:h-96 object-cover hover:brightness-75 transition-all"
                        alt="Memory"
                      />
                    ) : (
                      <video
                        src={memory.image_url}
                        className="rounded-xl w-full h-48 sm:h-72 lg:h-96 object-cover hover:brightness-75 transition-all"
                        autoPlay
                        loop
                        muted
                      />
                    )}
                  </Link>
                ))
              ) : (
                <p className="text-zinc-400">-</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCard;
