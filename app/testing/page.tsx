import MemoryCard from "@/components/class/MemoryCard";
import ProfileCard from "@/components/class/ProfileCard";

const Testing = () => {
  const profiles = [
    {
      name: "Tobi Oyadiran",
      title: "Product Designer II",
      description:
        "Meet Tobi Oyadiran, Product Designer II for the Spotify for Artists team in Stockholm.",
      imageUrl: "https://via.placeholder.com/400x600", // Replace with actual image URL
    },
    {
      name: "Grace Kwon",
      title: "Senior Service Designer",
      description:
        "Meet Grace Kwon, Senior Service Designer for Business Affairs in Brooklyn.",
      imageUrl: "https://via.placeholder.com/400x600", // Replace with actual image URL
    },
    {
      name: "Grace Kwon",
      title: "Senior Service Designer",
      description:
        "Meet Grace Kwon, Senior Service Designer for Business Affairs in Brooklyn.",
      imageUrl: "https://via.placeholder.com/400x600", // Replace with actual image URL
    },
    {
      name: "Grace Kwon",
      title: "Senior Service Designer",
      description:
        "Meet Grace Kwon, Senior Service Designer for Business Affairs in Brooklyn.",
      imageUrl: "https://via.placeholder.com/400x600", // Replace with actual image URL
    },
    {
      name: "Grace Kwon",
      title: "Senior Service Designer",
      description:
        "Meet Grace Kwon, Senior Service Designer for Business Affairs in Brooklyn.",
      imageUrl: "https://via.placeholder.com/400x600", // Replace with actual image URL
    },
    {
      name: "Grace Kwon",
      title: "Senior Service Designer",
      description:
        "Meet Grace Kwon, Senior Service Designer for Business Affairs in Brooklyn.",
      imageUrl: "https://via.placeholder.com/400x600", // Replace with actual image URL
    },
  ];

  const memories = [
    {
      title: "John Doe",
      likes: 123,
      monthsAgo: 5,
      image: "https://via.placeholder.com/400x200",
      profileImage: "https://via.placeholder.com/80",
    },
    {
      title: "John Doe",
      likes: 123,
      monthsAgo: 5,
      image: "https://via.placeholder.com/400x200",
      profileImage: "https://via.placeholder.com/80",
    },
    {
      title: "John Doe",
      likes: 123,
      monthsAgo: 5,
      image: "https://via.placeholder.com/400x200",
      profileImage: "https://via.placeholder.com/80",
    },{
      title: "John Doe",
      likes: 123,
      monthsAgo: 5,
      image: "https://via.placeholder.com/400x200",
      profileImage: "https://via.placeholder.com/80",
    },
  ];

  return (
    <div className="bg-blue-500 py-8">
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4`}
      >
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            name={profile.name}
            title={profile.title}
            description={profile.description}
            imageUrl={profile.imageUrl}
          />
        ))}
      </div>
      <div className="flex justify-center p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {memories.map((memory, index) => (
            <MemoryCard
              key={index}
              title={memory.title}
              likes={memory.likes}
              monthsAgo={memory.monthsAgo}
              image={memory.image}
              profileImage={memory.profileImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testing;
