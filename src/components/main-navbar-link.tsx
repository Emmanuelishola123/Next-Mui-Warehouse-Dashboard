import type { ElementType, FC, ReactNode } from 'react';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import type { ButtonProps } from '@mui/material';
import { Box, Button } from '@mui/material';

interface MainNavbarLinkProps extends ButtonProps {
  component?: ElementType;
  dropdown?: ReactNode;
  label: string;
  to?: string;
}

// NOTE: Dropdown is a div element, we display it on list item hover

export const MainNavbarLink: FC<MainNavbarLinkProps> = forwardRef((props, ref) => {
  const { component, label, dropdown, to, ...other } = props;

  return (
    <Box
      component="li"
      sx={{
        '&:hover > div': {
          display: 'block'
        }
      }}
    >
      <Button
        color="inherit"
        component={component}
        ref={ref}
        to={to}
        variant="text"
        {...other}
      >
        {label}
      </Button>
      {dropdown}
    </Box>
  );
});

MainNavbarLink.propTypes = {
  // @ts-ignore
  component: PropTypes.elementType,
  dropdown: PropTypes.node,
  label: PropTypes.string,
  to: PropTypes.string
};
