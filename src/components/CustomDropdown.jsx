import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
//import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
// import SvgIcon from "@mui/material/SvgIcon";

const ITEM_HEIGHT = 48;

const CustomDropdown = ({ options, handleAdd, selectedOption }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (value) => {
    if (handleAdd && value === "Add Custom Field") {
      handleAdd();
    } else {
      selectedOption(value);
    }

    handleClose();
  };

  const buttonName = "Custom Field";

  return (
    <div>
      <Button
        variant="text"
        // endIcon={
        //   <SvgIcon>
        //     <KeyboardArrowDownIcon />
        //   </SvgIcon>
        // }
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          backgroundColor: "transparent",
          color: "inherit",
          display: "flex",
          fontSize: "14px",
          fontWeight: 500,
          width: "145px",
          height: "24px",
          textTransform: "unset",
        }}
      >
        {buttonName}
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleOptionClick(option)}
            style={{
              paddingLeft: "16px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CustomDropdown;
