import * as React from "react";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { TableHead, TableRow, TableHeader as TableHeaderUI } from "@/components/ui/table";

export default function TableHeader({ headerGroups }: { headerGroups: HeaderGroup<any>[] }) {
  return (
    <TableHeaderUI>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header:any) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeaderUI>
  );
}