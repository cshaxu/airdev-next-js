'use client';
// TODO: Current code are not integrated with backend (besides the bot stream). All data are not saved anywhere.

import { Button } from '@/frontend/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/frontend/components/ui/Dialog';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/frontend/components/ui/Resizable';
import { ReactNodeProps } from '@/frontend/types/props';
import Sidebar, { SidebarItem } from './Sidebar';

type Props = ReactNodeProps & {
  modalTitle: string;
  sidebarTitle: string;
  sidebarItems: SidebarItem[];
  disabled?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId: string;
  onSelectId: (id: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitText: string;
  onCancel?: () => void;
  cancelText?: string;
};

export default function MultipleObjectsModal({
  children,
  modalTitle,
  sidebarTitle,
  sidebarItems,
  disabled,
  open,
  onOpenChange,
  selectedId,
  onSelectId,
  isSubmitting,
  onSubmit,
  submitText,
  onCancel,
  cancelText,
}: Props) {
  const handleSubmit = () => {
    if (isSubmitting) {
      return;
    } else {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[80vh] flex-col sm:max-w-[800px]">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-0 flex-1"
          >
            <ResizablePanel
              defaultSize={30}
              minSize={20}
              maxSize={50}
              className="min-h-0"
            >
              <Sidebar
                title={sidebarTitle}
                items={sidebarItems}
                selectedId={selectedId}
                onSelectId={onSelectId}
                disabled={disabled}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="min-h-0 overflow-hidden">
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Footer buttons */}
        <div className="flex flex-shrink-0 justify-end gap-2 border-t pt-4">
          {!!cancelText?.length && (
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={disabled || isSubmitting || !onCancel}
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={disabled || isSubmitting}
          >
            {submitText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
