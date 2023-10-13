import { useContext, useState } from "react";
import {
    Box,
    IconButton,
    TableCell,
    TableSortLabel,
    Tooltip,
    Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { TableContext } from "./index";
import TableFilters from "./TableFilters";
import CleanActiveFilters from "./TableFilters/CleanActiveFilters";

const TableColumn = ({
    id = "",
    label,
    type,
    labelAlign = "center",
    disabledFilter = false,
}) => {
    const context = useContext(TableContext);

    const { orderBy, setOrderBy, orderDir, setOrderDir, filterData } = context;

    const [openFilterById, setOpenFilterById] = useState(null);
    const [currentTarget, setCurrentTarget] = useState(null);

    ArrowUpwardIcon.defaultProps = {
        style: {
            transform: orderDir === "asc" ? "rotate(0deg)" : "rotate(180deg)",
            width: "1rem",
            height: "1rem",
            transition:
                "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
    };

    const handleSort = () => {
        if (orderBy === id) {
            setOrderDir(orderDir === "asc" ? "desc" : "asc");
        } else {
            setOrderBy(id);
            setOrderDir("asc");
        }
    };

    const handleClickFilter = (filter_id, id) => {
        setOpenFilterById(id);
        setCurrentTarget(document.getElementById(filter_id));
    };

    const onCloseFilter = () => {
        setOpenFilterById(null);
        setCurrentTarget(null);
    };

    return (
        <TableCell key={id}>
            {id !== "actions" ? (
                <Box
                    display="flex"
                    justifyContent={labelAlign === "right" ? "flex-end" : "space-between"}
                    alignContent="center"
                >
                    <TableSortLabel onClick={handleSort} hideSortIcon={true}>
                        {/* <Typography sx={{ fontWeight: "bold" }}>{label}</Typography> */}
                        {label}w{orderBy === id ? <ArrowUpwardIcon /> : null}
                    </TableSortLabel>
                    {!disabledFilter ? (
                        <>
                            <Tooltip title={`Filter ${label}`}>
                                <IconButton
                                    key={`filter_${id}`}
                                    id={`filter_${id}`}
                                    onClick={() => handleClickFilter(`filter_${id}`, id)}
                                >
                                    <FilterListIcon
                                        sx={{
                                            color: `${id === openFilterById || filterData[id] ? "#00C389" : ""
                                                }`,
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <TableFilters
                                type={type}
                                id={openFilterById}
                                anchorEl={currentTarget}
                                onClose={onCloseFilter}
                            />
                        </>
                    ) : null}
                </Box>
            ) : (
                <CleanActiveFilters id={id} />
            )}
        </TableCell>
    );
};

export default TableColumn;
