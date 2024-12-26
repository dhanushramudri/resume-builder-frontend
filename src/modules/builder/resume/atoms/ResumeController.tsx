import Image from 'next/image';
import { ReactNode } from 'react';
import Tooltip from '@mui/material/Tooltip';

interface ResumeControllerProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  className?: string;
}

const ResumeController = ({ zoomIn, zoomOut, resetZoom, className }: ResumeControllerProps) => {
  return <div className={className}>...</div>;
};

export default ResumeController;

function TooltipRenderer({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Tooltip title={title}>
      <div className="w-auto h-auto flex">{children}</div>
    </Tooltip>
  );
}
