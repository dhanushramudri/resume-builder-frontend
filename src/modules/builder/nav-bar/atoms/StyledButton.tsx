import { Button, styled, alpha } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.resume[50],
  borderColor: alpha(theme.palette.resume[50], 0.8),
  padding: '8px 16px', // Adjust padding for better button size
  borderRadius: '8px', // Add rounded corners for a smoother appearance
  textTransform: 'none', // Prevent text from being capitalized
  fontWeight: 500, // Slightly bolder text
  boxShadow: `0 2px 4px ${alpha(theme.palette.resume[50], 0.2)}`, // Subtle shadow for depth
  '&:focus': {
    outline: 'none', // Remove the outline when focused
    boxShadow: `0 0 0 2px ${alpha(theme.palette.resume[50], 0.5)}`, // Add focus ring for accessibility
  },
  ':hover': {
    borderColor: theme.palette.resume[50],
    backgroundColor: alpha(theme.palette.resume[50], 0.1), // Slightly darker background on hover
    boxShadow: `0 4px 6px ${alpha(theme.palette.resume[50], 0.3)}`, // Elevated shadow on hover
  },
  ':active': {
    backgroundColor: alpha(theme.palette.resume[50], 0.15), // Darker background on active press
    boxShadow: `0 2px 4px ${alpha(theme.palette.resume[50], 0.4)}`, // Active state shadow
  },
}));
