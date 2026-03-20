import { Button } from '@/frontend/components/ui/Button';
import { Dialog, DialogContent } from '@/frontend/components/ui/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/frontend/components/ui/Form';
import { Input } from '@/frontend/components/ui/Input';
import VisuallyHidden from '@/frontend/components/ui/VisuallyHidden';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(1)
    .refine((s) => s.trim().length > 0),
});
type FormData = z.infer<typeof formSchema>;

type Props = {
  label: string;
  isCreating: boolean;
  create: (name: string) => Promise<void>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateDialog({
  label,
  isCreating,
  create,
  isOpen,
  onOpenChange,
}: Props) {
  const [formId, setFormId] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });

  const onCancel = () => {
    form.reset();
    setFormId((prev) => prev + 1);
    onOpenChange(false);
  };

  const onSubmit = async (data: FormData) => {
    await create(data.name);
    setFormId((prev) => prev + 1);
    onOpenChange(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange} modal={true}>
        <DialogContent className="max-w-[400px]" showClose={false}>
          <VisuallyHidden>
            <h2>Create {label}</h2>
          </VisuallyHidden>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            key={formId}
          >
            <Form {...form}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter new name .." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="min-w-[100px]"
                  onClick={onCancel}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="min-w-[100px]"
                  disabled={isCreating}
                  isLoading={isCreating}
                >
                  Create
                </Button>
              </div>
            </Form>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
