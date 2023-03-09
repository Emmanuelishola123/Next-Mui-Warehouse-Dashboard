import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material';
import { MainNavbar } from './main-navbar';
import { MainSidebar } from './main-sidebar';
import { Footer } from './footer';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: 64
}));

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <MainLayoutRoot>
      <MainNavbar onOpenSidebar={() => setOpenSidebar(true)} />
      <MainSidebar
        onClose={() => setOpenSidebar(false)}
        open={lgDown && openSidebar}
      />
      {children}
      <Footer />
    </MainLayoutRoot>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};
