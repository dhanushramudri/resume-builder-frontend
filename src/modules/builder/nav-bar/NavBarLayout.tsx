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
import { useAuth } from '@clerk/nextjs';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';

const TOTAL_TEMPLATES_AVAILABLE = Object.keys(AVAILABLE_TEMPLATES).length;

const NavBarLayout = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  const closeMenu = () => {
    setMenuAnchor(null);
    setShowTemplates(false);
    setShowColors(false);
  };

  return (
    <nav className="fixed no-print top-0 left-0 right-0 h-16 bg-gradient-to-r from-teal-600 to-teal-500 flex items-center justify-between px-2 sm:px-4 md:px-6 shadow-lg z-50 print:hidden backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-700 hover:to-teal-600">
      <div className="flex items-center gap-2 md:gap-4 rounded-full">
        <Link
          href="/"
          className="flex-shrink-0 rounded-full transition-transform duration-300 hover:scale-110"
        >
          <Image
            src="/icons/resume1-icon.png"
            alt="logo"
            height={36}
            width={36}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full animate-pulse"
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
            className="text-teal-950 hover:bg-teal-700/50 bg-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            Update Details
          </StyledButton>
          <StyledButton
            variant="text"
            onClick={() => {
              closeMenu();
              router.push('/resumereview');
            }}
            className="text-teal-950 hover:bg-teal-700/50 bg-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            Resume Tailor
          </StyledButton>
          <PrintResume
            onClick={closeMenu}
            className="hover:scale-105 transition-transform duration-200"
          />
          <StyledButton
            variant="text"
            onClick={() => {
              closeMenu();
              signOut();
            }}
            className="text-red-600 hover:bg-red-600/90 hover:text-white bg-white rounded-lg transition-all duration-200 hover:scale-105"
          >
            Logout
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
        {showTemplates ? (
          <div className="p-4">
            <button
              onClick={() => setShowTemplates(false)}
              className="mb-4 text-teal-600 hover:text-teal-700 flex items-center gap-2"
            >
              <span className="text-lg">←</span> Back to Menu
            </button>
            <div className="space-y-2">
              <TemplateSelect />
            </div>
          </div>
        ) : showColors ? (
          <div className="p-4">
            <button
              onClick={() => setShowColors(false)}
              className="mb-4 text-teal-600 hover:text-teal-700 flex items-center gap-2"
            >
              <span className="text-lg">←</span> Back to Menu
            </button>
            <div className="space-y-2">
              <ThemeSelect />
            </div>
          </div>
        ) : (
          <div className="py-2">
            <MenuItem
              onClick={() => setShowTemplates(true)}
              className="hover:bg-teal-50 transition-colors duration-200 mb-2"
            >
              Templates ({TOTAL_TEMPLATES_AVAILABLE})
            </MenuItem>
            <MenuItem
              onClick={() => setShowColors(true)}
              className="hover:bg-teal-50 transition-colors duration-200 mb-2"
            >
              Colours
            </MenuItem>
            <div className="h-px bg-gray-200 my-2" />
            <MenuItem
              onClick={() => {
                closeMenu();
                router.push('/update');
              }}
              className="hover:bg-teal-50 transition-colors duration-200 mb-2"
            >
              Update Details
            </MenuItem>
            <MenuItem
              onClick={() => {
                closeMenu();
                router.push('/resumereview');
              }}
              className="hover:bg-teal-50 transition-colors duration-200 mb-2"
            >
              Resume Tailor
            </MenuItem>
            <PrintResume isMenuButton onClick={closeMenu} />
            <MenuItem
              onClick={() => {
                closeMenu();
                signOut();
              }}
              className="bg-red-600 text-white transition-colors duration-200 rounded-lg mt-2 hover:bg-red-700"
            >
              Logout
            </MenuItem>
          </div>
        )}
      </Menu>
    </nav>
  );
};

export default NavBarLayout;
