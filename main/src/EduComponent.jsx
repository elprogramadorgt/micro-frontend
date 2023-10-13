
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableWrapper from "../../app1/src/Table";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import EduTable from "dashboardApp/EduTable"


const columns = [
    { id: "code", label: "Code", type: "string", align: "left" },
    { id: "name", label: "Name", type: "string", align: "left" },
    { id: "lastName", label: "Last Name", type: "string", align: "left" },
    { id: "nickname", label: "Nick Name", type: "string", align: "left" },
    { id: "actions", label: "", type: "string", align: "center" },

]



const data = [
    { id: 1, name: "Edu 1", lastName: "elprogramadorgt", nickname: "Edu" },
    { id: 2, name: "Dendri 1", lastName: "From", nickname: "ElDendri" },
    { id: 3, name: "Kasuma 1", lastName: "0", nickname: "Kasuma" },
    { id: 4, name: "Faith 1", lastName: "gel", nickname: "faith" },
]


export default function EduComponent() {

    // const [data, setData] = useState(data1)

    // useEffect(() => {

    //     data.map(row => {
    //         row.options = [
    //             {
    //                 id: "edit",
    //                 title: "Edit",
    //                 icon: <EditIcon color="primary" sx={{ mr: 1 }} />,
    //                 onClick: async (row) => {
    //                 }

    //             },

    //             {
    //                 id: "Add",
    //                 title: "Add",
    //                 icon: <DeleteIcon color="primary" sx={{ mr: 1 }} />,
    //                 onClick: async (row) => {
    //                 }

    //             }
    //         ]
    //     })
    // }, [])

    // const [anchorEl, setAnchorEl] = useState([]);

    // const handleClick = (event, index) => {
    //     const newAnchorEl = [...anchorEl];
    //     newAnchorEl[index] = event.currentTarget;
    //     setAnchorEl(newAnchorEl);
    // };

    // const handleClose = (index) => {
    //     const newAnchorEl = [...anchorEl];
    //     newAnchorEl[index] = null;
    //     setAnchorEl(newAnchorEl);
    // };

    // const ITEM_HEIGHT = 48;


    return (
        <EduTable
            columns={columns}
            data={data}
            noDataMessage={"Edu not found"}
        />


    )

}