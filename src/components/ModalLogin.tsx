import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  open: boolean;
  handleClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  authLogin: {
    email: string;
    password: string;
  };
}

const BasicModal: React.FC<BasicModalProps> = ({
  open,
  handleClose,
  handleChange,
  handleLogin,
  authLogin,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            value={authLogin.email}
            name="email"
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            value={authLogin.password}
            name="password"
            onChange={handleChange}
            type="password"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BasicModal;
