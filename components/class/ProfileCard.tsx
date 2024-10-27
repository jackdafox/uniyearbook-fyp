interface ProfileCardProps {
    name: string;
    title: string;
    description: string;
    imageUrl: string;
    year: string;
    contacts: string;
}

const ProfileCard: React.FC<ProfileCardProps>= ({ name, title, description, imageUrl, year, contacts }) => {
    return (
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-80 h-72 object-cover"
        />
        <div className="border border-black text-black text-xs font-bold uppercase inline-block px-2 py-1 mt-2 transition-colors duration-300 cursor-pointer hover:bg-black hover:text-white">
         {contacts}
        </div>
        <h3 className="w-1.5 text-xl font-bold text-black mt-2 tracking-tight">
          {name}, {title}
        </h3>
        <p className="w-2/4 text-xs text-black mt-1">
          {description}
        </p>
      </div>
    );
  };
  
  export default ProfileCard;