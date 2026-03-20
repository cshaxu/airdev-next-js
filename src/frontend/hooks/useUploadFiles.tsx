'use client';

import { AWS_S3_PATH_USER_UPLOAD } from '@/common/config';
import { makeTransition } from '@/frontend/utils/make-transition';
import JsonApiClient from '@/generated/json-client';
import { useState } from 'react';

type Props = { onUpload: (file: File, id: string) => Promise<void> };

export function useUploadFiles({ onUpload }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const uploadToS3 = async (file: File) => {
    try {
      const id = crypto.randomUUID();
      const key = `${AWS_S3_PATH_USER_UPLOAD}/${id}`;
      const { url: presigned_url, fields } =
        await JsonApiClient.createS3PresignedPost({ key });
      const data: Record<string, any> = { ...fields, file };
      const body = new FormData();
      Object.entries(data).forEach(([k, v]) => body.append(k, v));
      await fetch(presigned_url, { method: 'POST', body });
      await onUpload(file, id);
    } catch (_err) {
      console.error(_err);
      throw new Error(`Failed to upload ${file.name}`);
    }
  };

  const handleUpload = async (files: File[]) => {
    setError(null);
    makeTransition(() => {
      setUploading(true);
    });

    try {
      await Promise.all(files.map(uploadToS3));
      addFiles(files);
    } catch (_err) {
      setError('Failed to upload some files');
    } finally {
      makeTransition(() => {
        setUploading(false);
      });
    }
  };

  return { files, isUploading, error, handleUpload, removeFile, addFiles };
}
