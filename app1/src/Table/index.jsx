import { createContext, useState, useMemo, Fragment, useEffect } from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";

import TableHeader from "./TableHeader";
import ActionsMenu from "./ActionsMenu";

import { useFilterData } from "../../../main/src/store.js";

import useTableHook from "./use-table-hook";

const TableContext = createContext();

const TableWrapper = ({ columns, data = [], noDataMessage }) => {
    const [orderBy, setOrderBy] = useState(columns[0]?.id ? columns[0]?.id : "");
    const [orderDir, setOrderDir] = useState("asc");

    const [filterData, setFilterData] = useFilterData();
    const {
        MAX_HEIGHT,
        stableSort,
        getComparator,
        getValueFromType,
        getHighlights,
    } = useTableHook(columns, filterData, setFilterData);

    const visibleRows = useMemo(() => {
        return stableSort(data, getComparator(orderDir, orderBy));
    }, [data, orderDir, orderBy]);

    useEffect(() => {
        console.log("aaaa");
    }, [visibleRows]);

    return (
        <TableContext.Provider
            value={{
                orderBy,
                setOrderBy,
                orderDir,
                setOrderDir,
                filterData,
                setFilterData,
            }}
        >
            <Paper elevation={0}>
                <Table>
                    <TableHeader columns={columns} />
                    <TableBody>
                        {visibleRows.length == 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <Box height={MAX_HEIGHT}>
                                        <Typography variant="inherit" align="center">
                                            {noDataMessage}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            visibleRows.map((row, index) => {
                                const element = columns.map(
                                    ({ id, type, align, subId, subType }, idx) => {
                                        if (id == "actions") {
                                            row[id] = (
                                                <>
                                                    <ActionsMenu
                                                        idx={`${idx}_${row.id}`}
                                                        index={index}
                                                        row={row}
                                                    />
                                                </>
                                            );

                                        }




                                        return (
                                            <TableCell
                                                key={`cell_${index}_${idx}_${row.id}`}
                                                align={align}
                                            // sx={{ pl: 2, pr }}
                                            >
                                                <span>
                                                    {row[id]}
                                                </span>
                                            </TableCell>
                                        );
                                    }
                                );

                                return (
                                    <TableRow hover key={`row_${index}_${row.id}`}>
                                        {element}
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </TableContext.Provider>
    );
};

export { TableContext };

export default TableWrapper;
