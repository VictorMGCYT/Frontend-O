import * as React from "react";
import { flexRender, Row } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow as TableRowUI } from "@/components/ui/table";

export default function TableRows({ rows, columnsLength }: { rows: Row<any>[], columnsLength: number }) {
  return (
    <TableBody>
      {rows.length ? (
        rows.map((row) => (
          <TableRowUI key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRowUI>
        ))
      ) : (
        <TableRowUI>
          <TableCell colSpan={columnsLength} className="h-24 text-center">
            Sin resultados.
          </TableCell>
        </TableRowUI>
      )}
    </TableBody>
  );
}