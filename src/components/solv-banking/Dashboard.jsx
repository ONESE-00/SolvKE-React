import DataTable from "../ui/DataTable";
import { useState } from "react";
import AppDialog from "../ui/AppDialog";

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

const ACTION_TYPES = {
    EDIT: "EDIT",
    DELETE: "DELETE",
};

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [activeAction, setActiveAction] = useState(null);

    const getDialogConfig = () => {
        switch (activeAction) {
            case ACTION_TYPES.DELETE:
                return {
                    title: "Delete User",
                    description: "This action cannot be undone",
                    confirmText: "Delete",
                    actions: [
                        {
                            label: "Cancel", variant: "outline", size: "xsm"
                        },
                        {
                            label: "Delete", variant: "destructive", size: "xsm"
                        }
                    ]
                };

            case ACTION_TYPES.EDIT:
                return {
                    title: "Edit User",
                    description: "Update user details below",
                    confirmText: "Save Changes",
                    actions: [
                        {
                            label: "Cancel", variant: "outline", size: "xsm"
                        },
                        {
                            label: "Edit", variant: "default", size: "xsm"
                        }
                    ]
                };

            default:
                return {
                    title: "",
                    description: "",
                    confirmText: "Confirm",
                    actions: [
                        {
                            label: "Cancel", variant: "outline", size: "xsm"
                        },
                        {
                            label: "Save Changes", variant: "default", size: "xsm"
                        }
                    ]
                };
        }
    };
    const dialogConfig = getDialogConfig();

    const handleConfirm = () => {
        switch (activeAction) {
            case ACTION_TYPES.DELETE:
                console.log("Deleting:", selectedRow);
                break;

            case ACTION_TYPES.EDIT:
                console.log("Editing:", selectedRow);
                break;

            default:
                console.log("Unknown action");
        }

        setOpen(false);
    };
    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">Dashboard</h1>

            {/* TABLE */}
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
                        variant: "outline",
                        size: "xssm",
                        type: ACTION_TYPES.EDIT,
                        onClick: (row, actionType) => {
                            setSelectedRow(row);
                            setActiveAction(actionType);
                            setOpen(true);
                        }
                    },
                    {
                        label: "Delete",
                        variant: "destructive",
                        size: "xsm",
                        type: ACTION_TYPES.DELETE,
                        onClick: (row, actionType) => {
                            setSelectedRow(row);
                            setActiveAction(actionType);
                            setOpen(true);
                        }
                    },
                ]}
            />

            {/* DIALOG */}
            <AppDialog
                open={open}
                onOpenChange={setOpen}
                title={dialogConfig.title}
                description={dialogConfig.description}
                confirmText={dialogConfig.confirmText}
                onConfirm={handleConfirm}
                actions={dialogConfig.actions}
            >
                <p>
                    Are you sure you want to proceed with{" "}
                    <strong>{selectedRow?.name}</strong>?
                </p>
            </AppDialog>
        </div>
    );
}