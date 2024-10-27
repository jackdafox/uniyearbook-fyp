import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import UploadFile from '@/components/admin/UploadForm';

export default async function UploadPage() {
  const supabase = createServerComponentClient({ cookies });

  // Fetch files from the 'avatars' bucket
  const { data: files, error } = await supabase.storage
    .from('profile')
    .list('public', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

  if (error) {
    console.error('Error fetching files from storage:', error);
    return <p>Error fetching files.</p>;
  }

  const fileUrls = files?.map((file) =>
    supabase.storage.from('profile').getPublicUrl(`public/${file.name}`).data.publicUrl
  );

  return (
    <div className="flex flex-col items-center justify-center mt-24 space-y-6">
      <h1 className="text-3xl font-bold">Upload and Manage Files</h1>
      
      <UploadFile />

      <h2 className="text-xl font-bold mt-8">Files in Avatars Bucket</h2>
      {fileUrls?.length ? (
        <ul>
          {fileUrls.map((url, idx) => (
            <li key={idx}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
}
