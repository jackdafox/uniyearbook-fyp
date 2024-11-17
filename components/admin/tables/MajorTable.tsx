import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Faculty, Major } from "@prisma/client";
import React from "react";

interface MajorTableProps {
  majors: (Major & {
    faculty: Faculty;
  })[];
}

const MajorTable = ({ majors }: MajorTableProps) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-5">Major Table</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Major Name</TableHead>
            <TableHead>Faculty</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {majors.map((major) => (
            <TableRow key={major.id}>
              <TableCell>{major.id}</TableCell>
              <TableCell>{major.name}</TableCell>
              <TableCell>{major.faculty.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MajorTable;
