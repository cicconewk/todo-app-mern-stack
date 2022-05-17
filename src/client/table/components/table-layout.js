import React from "react";

function TableLayout({ rows, children }) {
  return (
    <div className="col s7">
      <table>
        <thead>
          <tr>
            {rows?.map((row) => (
              <th key={row.id}>{row.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default TableLayout;
