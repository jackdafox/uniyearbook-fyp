import Image from "next/image";
import Logo from "../components/image/Logo.png";
import Searchbar from "@/components/search/Searchbar";
import Link from "next/link";
import { Avatar, IconButton } from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // or return a placeholder if needed
  }

  const userEmail = session.user?.email!;
  const userProfile = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  return (
    <nav className="w-full fixed z-[50] bg-white">
      <div className="flex px-5 py-2 items-center">
        <Link href="/">
          <Image
            src={Logo}
            width={150}
            height={150}
            alt="Logo"
            className="cursor-pointer"
          />
        </Link>
        <Searchbar />
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/event/create">
            <IconButton>
              <EditCalendarIcon
                sx={{
                  width: 35,
                  height: 35,
                  color: "dimgray",
                }}
              />
            </IconButton>
          </Link>
          <Link href="/profile">
            <IconButton>
              <Avatar src={userProfile?.profile_picture || "/default-profile.png"} />
            </IconButton>
          </Link>
        </div>
      </div>
    </nav>
  );
}
