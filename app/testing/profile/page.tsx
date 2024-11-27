import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const userEmail = session.user?.email!;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  const major = await prisma.major.findMany();
  
  const faculty = await prisma.faculty.findMany();

  const batch = await prisma.batch.findMany();

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="max-w-[50rem]">
      <h1 className="text-5xl font-semibold tracking-tight mt-10 mb-3 -ml-1">
        Edit Profile
      </h1>
      <p className="max-w-full mb-10 text-sm text-zinc-500">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </p>
      <EditProfileForm faculty={faculty} major={major} user={user} batch={batch}/>
    </div>
  );
};

export default page;
