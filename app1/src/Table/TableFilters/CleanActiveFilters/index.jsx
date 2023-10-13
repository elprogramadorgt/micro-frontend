import { useContext } from "react";

import { Box, IconButton, Tooltip } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

import { TableContext } from "../../index";

export default ({ id }) => {
  const context = useContext(TableContext);
  const { filterData, setFilterData } = context;

  return id === "actions" && Object.keys(filterData).length > 0 && !filterData['fullSearch'] && (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
    >
      <Tooltip title="Clean Active Filters">
        <IconButton onClick={() => setFilterData({})}>
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
