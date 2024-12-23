import { Student, User } from "@prisma/client";
import Link from "next/link";

interface ProfileCardProps {
  student: Student & {
    user: User;
  };
  batchName: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  student, batchName
}: ProfileCardProps) => {
  return (
    <Link href={`/profile/${student.user.id}`}>
      <div className="relative hover:scale-95 transition-all ease-in-out">
      <img
        src={student.user.profile_picture ? student.user.profile_picture : "https://placehold.co/320x288"}
        className="w-full sm:w-80 h-72 object-cover"
        alt={`${student.user.first_name}'s profile`}
      />
      <div className="border border-black text-black text-xs font-bold uppercase inline-block px-2 py-1 mt-2 transition-colors duration-300 cursor-pointer hover:bg-black hover:text-white">
        {batchName}
      </div>
      <h1 className="text-lg sm:text-xl font-bold text-black mt-2 tracking-tight">
        {student.user.first_name} {student.user.last_name}
      </h1>
      <p className="w-full text-xs text-black mt-1">{student.user.details || "(No description added)"}</p>
      </div>
    </Link>
  );
};

export default ProfileCard;
