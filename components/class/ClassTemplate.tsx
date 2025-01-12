"use client";

import ProfileCard from "@/components/class/ProfileCard";
import {
  Batch,
  Comment,
  Faculty,
  Major,
  Memory,
  Socials,
  Student,
  User,
} from "@prisma/client";
import MemoryCard2 from "../memories/MemoryCard2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ShinyButton from "../ui/shinybutton";
import { Button } from "../ui/button";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { MdOutlineEventRepeat } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { Component, CSSProperties, useRef } from "react";
import ClassPDF from "./ClassPDF";
import { PiStarFourFill, PiStudent } from "react-icons/pi";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface ClassClientProps {
  batch: Batch & {
    major: Major;
    faculty: Faculty;
    student: (Student & {
      user: User & {
        socials: Socials[];
        memories: Memory[];
      };
    })[];
  };
  memories?: (Memory & {
    user: User;
  })[];
  personal: boolean;
}

interface ComponentToPrintProps {
  innerRef: React.Ref<HTMLDivElement>;
  batch: Batch & {
    major: Major;
    faculty: Faculty;
    student: (Student & {
      user: User & {
        socials: Socials[];
        memories: Memory[];
      };
    })[];
  };
  memories?: (Memory & {
    user: User;
  })[];
}

class ComponentToPrint extends Component<ComponentToPrintProps> {
  render() {
    return (
      <div ref={this.props.innerRef} className={inter.className}>
        <ClassPDF
          batch={this.props.batch}
          memories={this.props.memories}
          personal={false}
        />
      </div>
    );
  }
}

export default function ClassClient({
  batch,
  memories,
  personal,
}: ClassClientProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: `
    @page {
      margin: 20mm;
      size: A4;
    }
    @media print {
      .print-container {
        padding: 20mm;
      }
    }
  `,
  });
  return (
    <div className="mt-5 md:mt-10 py-5 flex flex-col items-start justify-start">
      {/* Top Section */}
      <div className="p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter mb-3 md:mb-5">
          {batch.major.name.toUpperCase()}
        </h1>
        <p className="mt-2 md:mt-4 tracking-tight text-gray-600">
          <span className="text-base md:text-xl tracking-tighter">
            {batch.faculty.name} • {batch.name}
          </span>
        </p>
        {personal && (
          <div className="flex gap-3">
            <Button className="mt-4 rounded-full">
              <Link
                href={`/class/${batch.id}/memories/create?batchId=${batch.id}`}
                className="flex items-center gap-2"
              >
                <FiPlus /> Create Memories
              </Link>
            </Button>
            <Button
              className="mt-4 rounded-full"
              onClick={() => reactToPrintFn()}
            >
              <PiStarFourFill />
              Generate PDF
            </Button>
            <div></div>
            <div style={{ display: "none" }}>
              <ComponentToPrint
                innerRef={contentRef}
                batch={batch}
                memories={memories}
              />
            </div>
          </div>
        )}
      </div>
      <Tabs defaultValue="yearbook" className="w-full">
        <TabsList className="flex w-full justify-center md:justify-start border-b md:pl-10">
          <TabsTrigger className="md:max-w-[20rem] px-10 md:px-20 mt-1" value="yearbook">
            Yearbook
          </TabsTrigger>
          <TabsTrigger className="md:max-w-[20rem] px-10 md:px-20 mt-1" value="memories">
            Memories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="yearbook" className="w-full">
          {batch.student.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-2 px-2 md:px-10 py-3 md:py-10">
              {batch.student.map((student, index: number) => (
                <ProfileCard key={index} student={student} batch={batch} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-[25rem] gap-10 text-zinc-300">
              <PiStudent size={100} />
              <h1 className="text-[2rem] tracking-tighter font-semibold ">
                No students in this batch
              </h1>
            </div>
          )}
        </TabsContent>
        <TabsContent value="memories" className="w-full">
          {memories && memories.length > 0 ? (
            <div className="max-w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-10 mb-10 py-10">
              {(memories || []).map((memory) => (
                <MemoryCard2
                  key={memory.id}
                  memories={memory}
                  batchId={batch.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-[25rem] gap-10 text-zinc-300">
              <MdOutlineEventRepeat size={100} />
              <h1 className="text-[2rem] tracking-tighter font-semibold ">
                No memories in this batch
              </h1>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
