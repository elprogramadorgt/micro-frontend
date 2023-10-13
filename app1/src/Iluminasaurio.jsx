import TableWrapper from "./Table"
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


export default function Iluminasaurio() {
    return <TableWrapper
        columns={columns}
        data={data}
        noDataMessage={"Edu not found"}
    />
}