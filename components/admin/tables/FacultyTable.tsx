"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteFaculty } from "@/utils/actions/faculty";
import { Batch, Faculty, Major } from "@prisma/client";
import React from "react";

interface FacultyTableProps {
  faculty: (Faculty & {
    major: Major[];
    batch: Batch[];
  })[];
}

const FacultyTable = ({ faculty }: FacultyTableProps) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-5">Faculty Table</h1>
      <Table>
        <TableCaption>A list of Batches</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Faculty Name</TableHead>
            <TableHead>Major Count</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faculty.map((faculties) => (
            <TableRow key={faculties.id}>
              <TableCell>{faculties.id}</TableCell>
              <TableCell>{faculties.name}</TableCell>
              <TableCell>
                {faculties.major.length}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => deleteFaculty(faculties.id)}
                  className="bg-red-500"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FacultyTable;
