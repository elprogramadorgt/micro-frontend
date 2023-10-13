import { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  Stack,
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

  const handleChangeFilterBoolValue = (event) => {
    setValue(event.target.value);
    setOption("yesOrNo");
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
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChangeFilterBoolValue}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
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
