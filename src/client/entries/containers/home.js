import React, { useState, useEffect } from "react";

import HomeLayout from "../components/home-layout";
import Menu from "../../menu/containers/menu";
import Form from "../../form/components/form";
import Table from "../../table/components/table";
import Container from "../../form/components/container";
import { removeTask, setTask, useGetTasks } from "../../services/tasks";
import { Status } from "../../constants";

const FORM_INITIAL_VALUES = {
  id: "",
  title: "",
  description: "",
};

function Home() {
  const [formValues, setFormValues] = useState(FORM_INITIAL_VALUES);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();

    setIsFormLoading(true);
    try {
      const { id, title, description } = formValues;
      const result = await setTask(
        id,
        {
          title,
          description,
        },
        Boolean(id) ? "PUT" : "POST",
      );

      if (result.status === Status.OK) {
        setFormValues(FORM_INITIAL_VALUES);
        setFormValues(result?.data);
      }
    } catch (error) {
      // TODO: catch and handle promise exeception
    }

    setIsFormLoading(false);
  };

  const handleDeleteTask = async (id) => {
    try {
      const confirmation = confirm(
        "Are you sure you want to delete this task?",
      );

      if (confirmation && Boolean(id)) {
        const result = await removeTask(id);

        if (result.status === Status.OK) {
          M.toast({ html: "TASK DELETED" });
        } else {
          M.toast({
            html: "There was an unexpected error while deleting the task",
          });
        }
      }
    } catch (error) {
      // TODO: catch the exception
      M.toast({ html: "ACTION CANCELED" });
    }

    setFormValues((previous) => ({
      ...FORM_INITIAL_VALUES,
      tasks: previous.tasks,
    }));
  };

  const handleEditTask = ({ id, title, description }) => {
    setFormValues({
      id,
      title,
      description,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const [tasks, isFetchingTasks, _, getTasks] = useGetTasks(shouldUpdate, () =>
    setShouldUpdate(false),
  );

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <HomeLayout>
      <Menu />
      <Container>
        <Form
          id={formValues.id}
          title={formValues.title}
          description={formValues.description}
          onChange={handleChange}
          onSubmit={handleAddTask}
          isLoading={isFormLoading}
        />
        <Table
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          isLoading={isFetchingTasks}
        />
      </Container>
    </HomeLayout>
  );
}

export default Home;
