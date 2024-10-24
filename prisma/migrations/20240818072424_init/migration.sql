-- CreateTable
CREATE TABLE "Faculty" (
    "faculty_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("faculty_id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "batch_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("batch_id")
);

-- CreateTable
CREATE TABLE "Major" (
    "major_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "faculty_id" INTEGER NOT NULL,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("major_id")
);

-- CreateTable
CREATE TABLE "MajorBatch" (
    "major_id" INTEGER NOT NULL,
    "batch_id" INTEGER NOT NULL,

    CONSTRAINT "MajorBatch_pkey" PRIMARY KEY ("major_id","batch_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" SERIAL NOT NULL,
    "profile_picture" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "details" TEXT,
    "contacts" TEXT,
    "faculty_id" INTEGER NOT NULL,
    "major_id" INTEGER NOT NULL,
    "batch_id" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Memory" (
    "memory_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "creator_id" INTEGER,
    "likes" INTEGER,
    "description" TEXT,
    "date_posted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("memory_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizer_id" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "comment_id" SERIAL NOT NULL,
    "memory_id" INTEGER NOT NULL,
    "creator_id" INTEGER,
    "comment_text" TEXT NOT NULL,
    "date_posted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "MemoryImage" (
    "image_id" SERIAL NOT NULL,
    "memory_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "MemoryImage_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "EventImage" (
    "image_id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "EventImage_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "_MajorBatches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FacultyBatches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MajorBatches_AB_unique" ON "_MajorBatches"("A", "B");

-- CreateIndex
CREATE INDEX "_MajorBatches_B_index" ON "_MajorBatches"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FacultyBatches_AB_unique" ON "_FacultyBatches"("A", "B");

-- CreateIndex
CREATE INDEX "_FacultyBatches_B_index" ON "_FacultyBatches"("B");

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("faculty_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MajorBatch" ADD CONSTRAINT "MajorBatch_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "Major"("major_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MajorBatch" ADD CONSTRAINT "MajorBatch_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("batch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("faculty_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "Major"("major_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("batch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_memory_id_fkey" FOREIGN KEY ("memory_id") REFERENCES "Memory"("memory_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryImage" ADD CONSTRAINT "MemoryImage_memory_id_fkey" FOREIGN KEY ("memory_id") REFERENCES "Memory"("memory_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventImage" ADD CONSTRAINT "EventImage_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorBatches" ADD CONSTRAINT "_MajorBatches_A_fkey" FOREIGN KEY ("A") REFERENCES "Batch"("batch_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MajorBatches" ADD CONSTRAINT "_MajorBatches_B_fkey" FOREIGN KEY ("B") REFERENCES "Major"("major_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacultyBatches" ADD CONSTRAINT "_FacultyBatches_A_fkey" FOREIGN KEY ("A") REFERENCES "Batch"("batch_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacultyBatches" ADD CONSTRAINT "_FacultyBatches_B_fkey" FOREIGN KEY ("B") REFERENCES "Faculty"("faculty_id") ON DELETE CASCADE ON UPDATE CASCADE;
