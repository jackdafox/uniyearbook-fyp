import { authOptions } from "@/app/auth";
import prisma from "@/app/prisma";
import AddSocialsDialog from "@/components/dialogs/AddSocialsDialog";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Add } from "@mui/icons-material";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const userEmail = session.user?.email!;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      Student: {
        include: {
          Batch: {
            include: {
              Major: true,
              Faculty: true,
            },
          },
        },
      },
    },
  });

  if (!user || !user.Student) {
    return <h1>Profile not found</h1>;
  }

  const major = await prisma.major.findMany();

  const faculty = await prisma.faculty.findMany();

  const batch = await prisma.batch.findMany();

  return (
    <div className="w-full px-4 md:px-8 lg:px-20 xl:px-[20rem] mt-10 md:mt-20">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-6 md:mt-10 mb-2 md:mb-3 -ml-1">
        Edit Profile
      </h1>
      <p className="max-w-full mb-6 md:mb-10 text-xs md:text-sm text-zinc-500">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </p>
      {user && (
        <EditProfileForm
          user={{
            ...user,
            student: {
              ...user.Student,
              batch: {
                ...user.Student?.Batch,
                faculty: user.Student?.Batch.Faculty,
                major: user.Student?.Batch.Major,
              },
            },
          }}
          faculty={faculty}
          major={major}
          batch={batch}
        />
      )}
    </div>
  );
};

export default page;
