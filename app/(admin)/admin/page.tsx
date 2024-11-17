import prisma from "@/app/prisma";
import AddBatchForm from "@/components/admin/addBatchForm";
import AddFacultyForm from "@/components/admin/addFacultyForm";
import AddMajorForm from "@/components/admin/addMajorForm";
import BatchTable from "@/components/admin/tables/BatchTable";
import FacultyTable from "@/components/admin/tables/FacultyTable";
import MajorTable from "@/components/admin/tables/MajorTable";
import { Add } from "@mui/icons-material";

export default async function AdminPage() {
  const faculties = await prisma.faculty.findMany();
  const majors = await prisma.major.findMany();

  const facultiesTableItem = await prisma.faculty
    .findMany({
      include: {
        Major: true,
        Batch: true,
      },
    })
    .then((faculties) =>
      faculties.map((faculty) => ({
        ...faculty,
        major: faculty.Major,
        batch: faculty.Batch,
      }))
    );

  const majorTableItem = await prisma.major
    .findMany({
      include: {
        Faculty: true,
      },
    })
    .then((majors) =>
      majors.map((major) => ({ ...major, faculty: major.Faculty }))
    );

  const batches = await prisma.batch
    .findMany({
      include: {
        Faculty: true,
        Major: true,
      },
    })
    .then((batches) =>
      batches.map((batch) => ({
        ...batch,
        faculty: batch.Faculty,
        major: batch.Major,
      }))
    );

  return (
    <div className="flex gap-10 w-full px-10 py-2">
      <div className="flex flex-col gap-10 h-full sticky top-2 border-zinc-300 border p-3 rounded-xl ">
        <AddBatchForm faculty={faculties} major={majors} />
        <AddFacultyForm />
        <AddMajorForm faculty={faculties} />
      </div>
      <div className="flex flex-col gap-10 w-full">
        <BatchTable batch={batches} />
        <FacultyTable faculty={facultiesTableItem} />
        <MajorTable majors={majorTableItem} />
      </div>
    </div>
  );
}
