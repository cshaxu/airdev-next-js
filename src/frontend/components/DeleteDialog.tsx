'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@airdev/next/frontend/components/ui/AlertDialog';
import { Input } from '@airdev/next/frontend/components/ui/Input';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

type Props = {
  title: string;
  name: string;
  isOpen: boolean;
  isLoading?: boolean;
  isDangerous?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export default function DeleteDialog({
  title,
  name,
  isOpen,
  isLoading = false,
  isDangerous = true,
  onOpenChange,
  onConfirm,
}: Props) {
  // states
  const [confirmName, setConfirmName] = useState('');
  const isConfirmValid = isDangerous ? confirmName === name : true;

  // handlers
  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isConfirmValid) {
      return;
    }

    onConfirm();
    setConfirmName('');
    onOpenChange(false);
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          setConfirmName('');
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Delete {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              This action cannot be undone. This will permanently delete{' '}
              <strong className="text-foreground font-medium">{name}</strong>.
            </p>
            {isDangerous && (
              <div className="space-y-2">
                <p>
                  Please type{' '}
                  <strong className="text-foreground font-medium">
                    {name}
                  </strong>{' '}
                  to confirm.
                </p>
                <Input
                  value={confirmName}
                  onChange={(e) => setConfirmName(e.target.value)}
                  placeholder="Type to confirm"
                  className="bg-background text-foreground placeholder:text-muted-foreground max-w-[400px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && isConfirmValid && !isLoading) {
                      handleConfirm(e as any);
                    }
                  }}
                />
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={!isConfirmValid || isLoading}
            className="min-w-19"
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
