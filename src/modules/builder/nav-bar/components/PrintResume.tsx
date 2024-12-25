import { useEffect } from 'react';
import { MenuItem } from '@mui/material';
import { StyledButton } from '../atoms';

export const PrintResume: React.FC<{ isMenuButton?: boolean }> = ({ isMenuButton }) => {
  useEffect(() => {
    globalThis?.addEventListener('beforeprint', () => {
      globalThis.document.title = `Resume_Builder_${Date.now()}`;
    });

    globalThis?.addEventListener('afterprint', () => {
      globalThis.document.title = 'Single Page Resume Builder';
    });
  }, []);

  if (isMenuButton) {
    return <MenuItem onClick={globalThis?.print}>Download as PDF</MenuItem>;
  }

  return (
    <StyledButton
      onClick={globalThis?.print}
      variant="outlined"
      className="bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600 text-sm transition-colors duration-200 rounded-lg "
    >
      Download as PDF
    </StyledButton>
  );
};
