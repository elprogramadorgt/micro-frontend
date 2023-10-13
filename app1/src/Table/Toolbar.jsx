import { Children } from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Toolbar = ({ children, onSearch }) => {
    const mapChildren = (displayName) => {
        return Children.map(children, (child) =>
            child.type.displayName === displayName ? child : null
        );
    };

    const [searchValue, setSearchValue] = useState("");

    const title = mapChildren("Title");

    const options = mapChildren("Options");

    const handleSearch = (event) => {
        const { value } = event.target;
        if (typeof onSearch === "function") {
            setSearchValue(value);
            onSearch(value);
        }
    };

    //useEffect

    const SearchBox = ({ value }) => {
        return (
            <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={handleSearch}
                value={value}
                autoFocus={value ? true : false}
            />
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
            }}
        >
            <Box>{options}</Box>
            <Typography variant="h6" color="secondary">
                {title}
            </Typography>
            <SearchBox value={searchValue} />
        </Box>
    );
};

const Title = ({ children }) => children;
Title.displayName = "Title";
Toolbar.Title = Title;

const Options = ({ children }) => children;
Options.displayName = "Options";
Toolbar.Options = Options;

export default Toolbar;
