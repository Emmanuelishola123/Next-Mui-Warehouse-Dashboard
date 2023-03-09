import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { Plus as PlusIcon } from '../icons/plus';
import { QuestionMarkOutlined as QuestionMarkIcon } from '../icons/question-mark-outlined';

interface ResourceUnavailableProps {
  onCreate?: () => void;
  sx?: SxProps;
}

const ResourceUnavailableRoot = styled('div')(
  ({ theme }) => ({
    alignItems: 'center',
    // @ts-ignore
    backgroundColor: theme.palette.mode === 'light'
      ? theme.palette?.neutral?.[100]
      : theme.palette?.neutral?.[900],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3)
  })
);

export const ResourceUnavailable: FC<ResourceUnavailableProps> = (props) => {
  const { onCreate, ...other } = props;

  return (
    <ResourceUnavailableRoot {...other}>
      <QuestionMarkIcon sx={{ color: 'text.secondary' }} />
      <Typography
        color="textSecondary"
        sx={{ mt: 2 }}
        variant="body2"
      >
        There are not objects here yet.
      </Typography>
      {onCreate && (
        <Button
          color="primary"
          onClick={onCreate}
          startIcon={<PlusIcon fontSize="small" />}
          sx={{ mt: 2 }}
          variant="contained"
        >
          Create Object
        </Button>
      )}
    </ResourceUnavailableRoot>
  );
};

ResourceUnavailable.propTypes = {
  onCreate: PropTypes.func
};
