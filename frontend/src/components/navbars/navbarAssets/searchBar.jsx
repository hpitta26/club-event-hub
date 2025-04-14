import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchBar({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <DialogTitle>Search</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ marginRight: 1, marginTop: 1 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <TextField
          autoFocus
          placeholder="Type to search..."
          variant="outlined"
          fullWidth
        />
        <Typography variant="body2" sx={{ marginTop: 2, color: 'text.secondary' }}>
          Press <strong>Esc</strong> or click the X to close.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
