import React from "react";
import propTypes from "prop-types";
import Spinner from "../../spinner";

function Form({ title, description, id, onSubmit, onChange, isLoading }) {
  return (
    <div className="col s5">
      <div className="card">
        <div className="card-content">
          <div className="title">
            <h5>TASKS</h5>
          </div>
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  placeholder="Task title"
                  name="title"
                  onChange={onChange}
                  value={title}
                  disabled={isLoading}
                  required
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  name="description"
                  onChange={onChange}
                  placeholder="Task description..."
                  className="materialize-textarea"
                  value={description}
                  disabled={isLoading}
                  required
                ></textarea>
              </div>
            </div>
            <button
              className="btn light-blue darken-4"
              type="submit"
              disabled={isLoading || !title || !description}
            >
              {isLoading ? (
                <Spinner size="small" />
              ) : Boolean(id) ? (
                "UPDATE"
              ) : (
                "ADD"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Form.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  _id: propTypes.string,
  onChange: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};

Form.defaultProps = {
  title: "",
  description: "",
  onSubmit: () => {},
  onChange: () => {},
};

export default Form;
