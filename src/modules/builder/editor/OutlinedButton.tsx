import { ReactNode } from 'react';

interface OutlinedButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string; // Add className prop
}

const OutlinedButton = ({ onClick, children, disabled, className }: OutlinedButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default OutlinedButton;
