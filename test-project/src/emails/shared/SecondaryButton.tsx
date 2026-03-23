import { Link } from '@react-email/components';

type Props = { href: string; text: string };

export default function SecondaryButton({ href, text }: Props) {
  return (
    <Link href={href} className="text-base text-neutral-900 underline">
      {text}
    </Link>
  );
}
