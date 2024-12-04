import { Student, User } from "@prisma/client";
import Link from "next/link";

interface ProfileCardProps {
  student: Student & {
    user: User;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  student,
}: ProfileCardProps) => {
  return (
    <Link href={`/profile/${student.user.id}`}>
      <div className="relative hover:scale-95 transition-all ease-in-out">
        <img
          src={student.user.profile_picture ? student.user.profile_picture : "https://placehold.co/320x288"}
          className="w-80 h-72 object-cover"
        />
        <div className="border border-black text-black text-xs font-bold uppercase inline-block px-2 py-1 mt-2 transition-colors duration-300 cursor-pointer hover:bg-black hover:text-white">
          {student.user.contacts}
        </div>
        <h1 className="text-xl font-bold text-black mt-2 tracking-tight">
          {student.user.first_name} {student.user.last_name}
        </h1>
        <p className="w-2/4 text-xs text-black mt-1">{student.user.details}</p>
      </div>
    </Link>
  );
};

export default ProfileCard;
