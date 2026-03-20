import { Button } from '@react-email/components';

type Props = { href: string; text: string };

export default function PrimaryButton({ href, text }: Props) {
  return (
    <Button
      href={href}
      className="rounded-[100px] bg-neutral-900 px-6 py-2 text-base text-neutral-50"
    >
      {text}
    </Button>
  );
}
