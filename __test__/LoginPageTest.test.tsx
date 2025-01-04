// components/__tests__/ProfileCard.test.tsx
import { render, screen } from "@testing-library/react";
import '@jest/globals';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import ProfileCard from "@/components/class/ProfileCard";
import { major } from "@mui/material";

describe("ProfileCard", () => {
  const mockStudent = {
    id: 1,
    userId: 1,
    batch_id: 1,
    user: {
      id: 1,
      email: "test@example.com",
      password: "hash",
      first_name: "John",
      last_name: "Doe",
      profile_picture: "https://example.com/photo.jpg",
      details: "Test bio",
      contacts: null,
      socials: [],
      memories: [],
      batch: {
        id: 1,
        name: "Batch 2024",
        faculty: {
          id: 1,
          name: "Faculty of Science",
        },
        major: {
          id: 1,
          name: "Computer Science",
        }
      }
    },
  };

  const mockBatch = {
    id: 1,
    name: "Batch 2024",
    majorId: 1,
    facultyId: 1,
    faculty: {
      id: 1,
      name: "Faculty of Science",
    },
    major: {
      id: 1,
      name: "Computer Science",
      faculty_id: 1
    }
  };

  const mockBatchName = "Batch 2024";

  it("renders user information correctly", () => {
    render(<ProfileCard student={mockStudent} batch={mockBatch} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Test bio")).toBeInTheDocument();
    expect(screen.getByText("Batch 2024")).toBeInTheDocument();
  });

  it("uses fallback image when profile picture is not provided", () => {
    const studentWithoutPhoto = {
      ...mockStudent,
      user: {
        ...mockStudent.user,
        profile_picture: null,
      },
    };

    render(
      <ProfileCard student={studentWithoutPhoto} batch={mockBatch} />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://placehold.co/320x288");
  });

  it("shows default text when user details are not provided", () => {
    const studentWithoutDetails = {
      ...mockStudent,
      user: {
        ...mockStudent.user,
        details: null,
      },
    };

    render(
      <ProfileCard student={studentWithoutDetails} batch={mockBatch} />
    );
    expect(screen.getByText("(No description added)")).toBeInTheDocument();
  });

  it("links to correct profile page", () => {
    render(<ProfileCard student={mockStudent} batch={mockBatch} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/profile/1");
  });
});
