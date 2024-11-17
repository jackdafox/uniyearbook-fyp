import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Batch, Faculty, Major } from "@prisma/client";
import React from "react";

interface BatchTableProps {
  batch: (Batch & {
    faculty: Faculty;
    major: Major;
  })[];
}

const BatchTable = ({ batch }: BatchTableProps) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-5">Batch Table</h1>
      <Table>
        <TableCaption>A list of Batches</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Faculty</TableHead>
            <TableHead>Major</TableHead>
            <TableHead className="text-right">Batch Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batch.map((batches) => (
            <TableRow key={batches.id}>
              <TableCell>{batches.id}</TableCell>
              <TableCell>{batches.faculty.name}</TableCell>
              <TableCell>{batches.major.name}</TableCell>
              <TableCell className="text-right">{batches.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BatchTable;
