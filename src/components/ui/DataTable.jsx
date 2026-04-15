import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/Input";
import { Field } from "./Field";
import { Checkbox } from "@/components/ui/checkbox";

export default function DataTable({
  title,
  columns,
  data,
  checkboxColumn = false,
  onSearch,
  onPageChange,
  totalPages = 1,
  actionButtons = [],
}) {
  const [search, setSearch] = useState(" ");
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  // ----------------------------
  // SEARCH HANDLER
  // ----------------------------
  const handleSearch = (value) => {
    setSearch(value);
    onSearch?.(value);
  };

  // ----------------------------
  // PAGINATION HANDLER
  // ----------------------------
  const handlePageChange = (newPage) => {
    setPage(newPage);
    onPageChange?.(newPage);
  };

  // ----------------------------
  // ROW SELECTION
  // ----------------------------
  const toggleRow = (row) => {
    setSelectedRows((prev) => {
      const exists = prev.includes(row);
      if (exists) {
        return prev.filter((r) => r !== row);
      }
      return [...prev, row];
    });
  };

  // ----------------------------
  // ALL ROWS SELECT
  // ----------------------------
  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data);
    }
  };

  return (
    <div className="w-full space-y-4 rounded-md border px-2 py-4">
      {/* TITLE + SEARCH */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>

        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-[320px] h-12 rounded-2xl border-slate-200 bg-white"

        />
      </div>

      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            {checkboxColumn && (
              <TableHead>
                <Checkbox
                  checked={selectedRows.length === data.length}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
            )}

            {columns.map((col) => (
              <TableHead key={col.accessor}>
                {col.header}
              </TableHead>
            ))}

            {actionButtons.length > 0 && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={
                rowIndex % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50 dark:bg-gray-900"
              }
            >
              {/* CHECKBOX */}
              {checkboxColumn && (
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(row)}
                    onCheckedChange={() => toggleRow(row)}
                  />
                </TableCell>
              )}

              {/* DATA CELLS */}
              {columns.map((col) => (
                <TableCell key={col.accessor}>
                  {row[col.accessor]}
                </TableCell>
              ))}

              {/* ACTION BUTTONS */}
              {actionButtons.length > 0 && (
                <TableCell className="space-x-2">
                  {actionButtons.map((btn, i) => (
                    <button
                      key={i}
                      className="text-blue-600 hover:underline"
                      onClick={() => btn.onClick(row)}
                    >
                      {btn.label}
                    </button>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-4">

        {/* LEFT - pagination info */}
        <div className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </div>

        {/* RIGHT - buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="
        px-3 py-1 text-sm rounded-md border
        hover:bg-gray-100
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
          >
            Previous
          </button>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="
        px-3 py-1 text-sm rounded-md border
        hover:bg-gray-100
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}