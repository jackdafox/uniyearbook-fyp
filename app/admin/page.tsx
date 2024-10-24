import prisma from "@/app/prisma";
import Form from "@/components/adminForm";

export default async function AdminPage() {
  const faculties = await prisma.faculty.findMany();
  const majors = await prisma.major.findMany();

  return (
    <div className="mt-24 p-8 space-y-6">
      <Form title="Add Faculty" action="/api/addFaculty" inputs={[{ placeholder: "Faculty Name", key: "name" }]} />
      
      <Form 
        title="Add Major"
        action="/api/addMajor"
        inputs={[
          { placeholder: "Major Name", key: "name" },
          {
            type: "select",
            key: "faculty_id",
            options: faculties.map((faculty) => ({ value: faculty.id, label: faculty.name })),
            placeholder: "Select Faculty",
          },
        ]}
      />

      <Form 
        title="Add Batch"
        action="/api/addBatch"
        inputs={[
          { placeholder: "Batch Name", key: "name" },
          {
            type: "select",
            key: "facultyId",
            options: faculties.map((faculty) => ({ value: faculty.id, label: faculty.name })),
            placeholder: "Select Faculty",
          },
          {
            type: "select",
            key: "majorId",
            options: majors.map((major) => ({ value: major.id, label: major.name })),
            placeholder: "Select Major",
          },
        ]}
      />
    </div>
  );
}
