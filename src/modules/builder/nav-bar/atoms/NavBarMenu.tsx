import { ReactNode } from 'react';

interface NavBarMenuProps {
  children: ReactNode;
  className?: string;
}

export const NavBarMenu = ({ children, className }: NavBarMenuProps) => {
  return <div className={className}>{children}</div>;
};
