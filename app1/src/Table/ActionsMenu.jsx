import { useState } from "react";
import { IconButton, ListItemText, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

const ActionsMenu = ({ index, row, idx }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOptionClick = (option, row) => {
        option.onClick(row);
        handleClose();
    };

    const handleClick = (event, a, b) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-label="more"
                id={`actions-button-${idx}`}
                key={`action_icon_${idx}`}
                aria-controls={open ? "actions-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="actions-menu"
                key={`action_menu_${idx}`}
                // key={`actions-menu_${index}`}
                MenuListProps={{
                    "aria-labelledby": "actions-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >

                <MenuItem
                    // key={`menuItem_${idx}`}
                    key={`action_item_1`}

                >
                    Action 1
                </MenuItem>

                {/* {row.options?.map((option, idxi) => (
                    <MenuItem
                        // key={`menuItem_${idx}`}
                        key={`action_item_${idx}_${idxi}`}
                        onClick={() => handleOptionClick(option, row)}
                    >
                        <>
                            {option.icon}
                            <ListItemText>{option.title}</ListItemText>
                        </>
                    </MenuItem>
                ))} */}
            </Menu>
        </>
    );
};

export default ActionsMenu;

