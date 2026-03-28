/* "@airdev/next": "managed" */

import { ReactNodeProps } from '@/airdev/frontend/types/props';
import { Container as ReactEmailContainer } from '@react-email/components';

export default function Container({ children }: ReactNodeProps) {
  return (
    <ReactEmailContainer
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #000000',
        padding: '2rem 1rem',
      }}
    >
      {children}
    </ReactEmailContainer>
  );
}
