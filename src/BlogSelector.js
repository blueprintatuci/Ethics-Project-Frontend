import React from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu( blog ) {
  const [anchorEl, setAnchorEl] = React.useState(blog);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Choose Blog
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Zero Waste</MenuItem>
        <MenuItem onClick={handleClose}>Water Conservation</MenuItem>
        <MenuItem onClick={handleClose}>Sustainable Clothing</MenuItem>
      </Menu>
    </div>
  );
}