import Image from 'next/image';

const divisions = [
  { name: 'Divisi Kewirausahaan', imageSrc: '/path/to/image1.jpg' },
  { name: 'Divisi Advokasi dan Pendampingan', imageSrc: '/path/to/image2.jpg' },
  { name: 'Divisi Media, Informasi dan Komunikasi', imageSrc: '/path/to/image3.jpg' },
  { name: 'Badan Pengurus Harian', imageSrc: '/path/to/image4.jpg' },
  { name: 'Divisi Seni Budaya dan Olahraga', imageSrc: '/path/to/image5.jpg' },
  { name: 'Divisi Keintektualan dan Penelitian', imageSrc: '/path/to/image6.jpg' },
  { name: 'Divisi Agama dan Sosial Masyarakat', imageSrc: '/path/to/image7.jpg' },
  { name: 'Divisi Pengembangan Organisasi', imageSrc: '/path/to/image8.jpg' },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-3 gap-4">
        {divisions.map((division, index) => (
          <div key={index} className="border p-4 text-center">
            <Image
              src={division.imageSrc}
              alt={division.name}
              width={300}
              height={300}
              className="mx-auto"
            />
            <h2 className="mt-2 font-semibold">{division.name}</h2>
          </div>
        ))}
        <div className="col-span-3 text-center">
          <Image
            src="/path/to/center-image.jpg"
            alt="PPI - UM 2023"
            width={400}
            height={400}
            className="mx-auto"
          />
          <h2 className="text-xl font-semibold mt-4">PPI - UM 2023</h2>
        </div>
      </div>
    </div>
  );
}
