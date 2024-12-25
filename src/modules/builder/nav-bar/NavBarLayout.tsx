import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { NavMenuItem } from './components/MenuItem';
import { PrintResume } from './components/PrintResume';
import { TemplateSelect } from './components/TemplateSelect';
import { ThemeSelect } from './components/ThemeSelect';
import { NavBarActions, NavBarMenu, StyledButton } from './atoms';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';

const TOTAL_TEMPLATES_AVAILABLE = Object.keys(AVAILABLE_TEMPLATES).length;

const NavBarLayout = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <nav className="fixed no-print top-0 left-0 right-0 h-16 bg-gradient-to-r from-teal-600 to-teal-500 flex items-center justify-between px-2 sm:px-4 md:px-6 shadow-lg z-50 print:hidden backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-700 hover:to-teal-600">
      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-110">
          <Image
            src="/icons/resume-icon.png"
            alt="logo"
            height={36}
            width={36}
            className="w-8 h-8 md:w-9 md:h-9 animate-pulse"
          />
        </Link>

        <NavBarMenu className="hidden sm:flex animate-fadeIn print:hidden">
          <NavMenuItem
            caption={`Templates (${TOTAL_TEMPLATES_AVAILABLE})`}
            popoverChildren={<TemplateSelect />}
            className="hover:bg-teal-700/50 print:hidden rounded-lg transition-colors duration-200"
          />
          <NavMenuItem
            caption="Colours"
            popoverChildren={<ThemeSelect />}
            className="hover:bg-teal-700/50 print:hidden rounded-lg transition-colors duration-200"
          />
        </NavBarMenu>
      </div>

      <div className="hidden print:hidden no-print md:flex items-center gap-4 animate-slideInRight">
        <NavBarActions>
          <StyledButton
            variant="text"
            onClick={() => {
              closeMenu();
              router.push('/update');
            }}
            className="text-white hover:bg-teal-700/50 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Update Details
          </StyledButton>
          <PrintResume
            onClick={() => {
              closeMenu();
            }}
            className="hover:scale-105 transition-transform duration-200"
          />
          <StyledButton
            variant="text"
            onClick={() => {
              closeMenu();
              router.push('/resumereview');
            }}
            className="text-white hover:bg-teal-700/50 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Resume Tailor
          </StyledButton>
        </NavBarActions>
      </div>

      <button
        className="flex md:hidden text-white p-2 hover:bg-teal-700/50 rounded-full transition-all duration-200 hover:scale-110 animate-bounce"
        onClick={(e) => setMenuAnchor(e.currentTarget)}
        aria-label="Open menu"
      >
        <Image
          src="/icons/more-horizontal.svg"
          alt="menu"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </button>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className="mt-14 print:hidden no-print"
        PaperProps={{
          className: 'bg-white/90 backdrop-blur-md rounded-lg shadow-xl',
          elevation: 0,
        }}
      >
        <MenuItem
          onClick={() => {
            closeMenu();
            router.push('/update');
          }}
          className="hover:bg-teal-50 transition-colors duration-200"
        >
          Update Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu();
            router.push('/resumereview');
          }}
          className="hover:bg-teal-50 transition-colors duration-200"
        >
          Resume Tailor
        </MenuItem>
        <PrintResume isMenuButton onClick={closeMenu} />
      </Menu>
    </nav>
  );
};

export default NavBarLayout;
