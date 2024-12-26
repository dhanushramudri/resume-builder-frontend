import { ReactNode } from 'react';

export interface INavMenuItemProps {
  caption: string;
  popoverChildren: ReactNode;
  className?: string;
}
