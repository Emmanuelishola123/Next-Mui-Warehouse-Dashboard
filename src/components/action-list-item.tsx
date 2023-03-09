import type { ElementType, FC } from 'react';
import PropTypes from 'prop-types';
import type { ListItemButtonProps } from '@mui/material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface ActionListItemProps extends ListItemButtonProps {
  icon: ElementType;
  label: string;
}

export const ActionListItem: FC<ActionListItemProps> = (props) => {
  const { icon: Icon, label, ...other } = props;

  return (
    <ListItemButton {...other}>
      <ListItemIcon>
        <Icon
          fontSize="small"
          sx={{ color: 'text.secondary' }}
        />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

ActionListItem.propTypes = {
  // @ts-ignore
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired
};
