import DataTable from "../ui/DataTable"

const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
];

const users = [
    { name: "John Doe", email: "john@example.com", role: "Admin" },
    { name: "Jane Smith", email: "jane@example.com", role: "User" },
    { name: "Alice Johnson", email: "alice@example.com", role: "User" },
];

export default function Dashboard() {
    return (
        <div className="bg-red">Dashboard

            <DataTable
                title="Users"
                columns={columns}
                data={users}
                checkboxColumn={true}
                totalPages={5}
                onSearch={(value) => console.log("search:", value)}
                onPageChange={(page) => console.log("page:", page)}
                actionButtons={[
                    {
                        label: "Edit",
                        onClick: (row) => console.log("edit", row),
                    },
                    {
                        label: "Delete",
                        onClick: (row) => console.log("delete", row),
                    },
                ]}
            />
        </div>
    )
}