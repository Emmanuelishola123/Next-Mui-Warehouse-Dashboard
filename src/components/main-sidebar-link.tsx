import type { FC } from 'react';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import type { SxProps } from '@mui/system';

interface MainSidebarLinkProps extends ButtonProps {
  label: string;
  sx?: SxProps;
}

export const MainSidebarLink: FC<MainSidebarLinkProps> = forwardRef((props, ref) => {
  const { label, sx, ...other } = props;

  return (
    <li>
      <Button
        color="inherit"
        ref={ref}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          width: '100%',
          ...sx
        }}
        variant="text"
        {...other}
      >
        {label}
      </Button>
    </li>
  );
});

MainSidebarLink.propTypes = {
  // @ts-ignore
  label: PropTypes.string,
  sx: PropTypes.object
};
