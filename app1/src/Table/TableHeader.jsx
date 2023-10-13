import { TableHead, TableRow } from "@mui/material";
import TableColumn from "./TableColumn";

const TableHeader = ({ columns }) => {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableColumn key={column.id} {...column} />
                ))}
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
