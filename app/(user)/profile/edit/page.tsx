import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // or return a placeholder if needed
  }

  const userEmail = session.user?.email!;

  const user = await prisma.user.findUnique({
    where: { email: userEmail }
  });

  return (
    <div className="max-w-[50rem]">
      <h1 className="text-5xl font-semibold tracking-tight mt-10 mb-3 -ml-1">
        Edit Profile
      </h1>
      <p className="max-w-full mb-10 text-sm text-zinc-500">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </p>
      {user && <EditProfileForm user={user} />}
    </div>
  );
};

export default page;
