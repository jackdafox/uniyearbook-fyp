'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase/supabaseClient'; // Client-side Supabase client

export default function UploadFile() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select a file to upload.');
      }

      const file = e.target.files[0];
      setUploading(true);

      // Upload file to Supabase Storage bucket 'avatars'
      const { data, error } = await supabase.storage
        .from('profile')
        .upload(`public/${file.name}`, file);

      // Retrieve the public URL of the uploaded file
      const { data: urlData } = supabase.storage
        .from('profile')
        .getPublicUrl(`public/${file.name}`);

      setFileUrl(urlData.publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
      />
      
      {uploading ? (
        <p>Uploading...</p>
      ) : (
        fileUrl && (
          <img
            src={fileUrl}
            alt="Uploaded"
            className="mt-4 w-48 h-48 object-cover rounded-lg"
          />
        )
      )}
    </div>
  );
}
