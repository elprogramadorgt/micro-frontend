import { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { TableContext } from "../../index";

export default ({ id, open, anchorEl, onClose }) => {
  const context = useContext(TableContext);

  const { filterData, setFilterData } = context;
  const [option, setOption] = useState(
    filterData[id] ? filterData[id].option : ""
  );
  const [value, setValue] = useState(
    filterData[id] ? filterData[id].value : ""
  );

  const handleChangeFilterOperator = (event) => {
    setOption(event.target.value);
  };

  const handleChangeFilterNumericValue = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setValue(event.target.value);
    }
  };

  const onClickClean = (e) => {
    const key = e.target.id;
    const { [key]: undefined, ...rest } = filterData;
    setFilterData({ ...rest });
    setOption("");
    setValue("");
    onClose();
  };

  const onClickFlilter = (e) => {
    if (value.trim().length == 0) {
      onClose();
      return;
    }
    const key = e.target.id;
    const newFilter = {};
    newFilter[key] = { option, value };
    setFilterData({ ...filterData, ...newFilter });
    onClose();
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 2 }}>
        <FormControl fullWidth>
          <Select
            value={option}
            onChange={handleChangeFilterOperator}
            size="small"
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="equal">Equal To ( = )</MenuItem>
            <MenuItem value="notEqual">Not Equal To ( &lt;&gt; )</MenuItem>
            <MenuItem value="lessThan">Less Than To ( &lt; )</MenuItem>
            <MenuItem value="lessThanOrEqual">
              Less Than or Equal To ( &lt;= )
            </MenuItem>
            <MenuItem value="greaterThan">Greater Than To ( &gt; )</MenuItem>
            <MenuItem value="greaterThanOrEqual">
              Greater Than or Equal To ( &gt;= )
            </MenuItem>
          </Select>
          <TextField
            value={value}
            onChange={handleChangeFilterNumericValue}
            placeholder="Value"
            variant="outlined"
            size="small"
            sx={{ pt: 2 }}
          />
          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            sx={{ pt: 2 }}
          >
            <Button
              id={id}
              variant="outlined"
              size="small"
              sx={{ px: 4 }}
              onClick={onClickClean}
            >
              Clear
            </Button>
            <Button
              id={id}
              variant="contained"
              size="small"
              sx={{ px: 4 }}
              onClick={onClickFlilter}
            >
              Filter
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </Popover>
  );
};
