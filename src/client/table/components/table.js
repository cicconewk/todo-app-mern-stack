import React from "react";
import propTypes from "prop-types";

import TableLayout from "./table-layout";
import Spinner from "../../spinner";

const ROWS = [
  { id: "title-1", label: "title" },
  { id: "desc-1", label: "descrition" },
];

function Table({ tasks, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return (
      <TableLayout>
        <Spinner />
      </TableLayout>
    );
  }

  return (
    <TableLayout rows={ROWS}>
      {tasks?.map((task) => {
        return (
          <tr key={task._id}>
            <td style={"text-trasform: capitalize"}>{task.title}</td>
            <td>{task.description}</td>
            <td>
              <button
                className="btn green darken-4"
                style={{ margin: "4px" }}
                onClick={() => onEdit(task)}
              >
                <i className="material-icons">edit</i>
              </button>
              <button
                className="btn red darken-4"
                onClick={() => onDelete(task._id)}
              >
                <i className="material-icons">delete</i>
              </button>
            </td>
          </tr>
        );
      })}
    </TableLayout>
  );
}

Table.propTypes = {
  tasks: propTypes.array.isRequired,
  onEdit: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
};

export default Table;
