import { useState, useEffect } from "react";
import { Status } from "../constants";

export const useGetTasks = (shouldExecute, stopUpdate) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const request = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (shouldExecute) {
      fetch();
    }

    return () => {
      stopUpdate();
    };
  }, [shouldExecute]);

  return [data, loading, error, request];
};

export const setTask = (id, task, method = "POST") => {
  const URL = `http://localhost:3000/api/tasks/${id ?? ""}`;

  return new Promise((resolve, reject) => {
    fetch(URL, {
      method,
      body: task,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (method === "PUT") {
          M.toast({ html: "TASK UPDATED" });
        } else {
          M.toast({ html: "TASK SAVED" });
        }

        resolve({ status: Status.OK, data });
      })
      .catch((err) => reject(err));
  });
};

export const removeTask = (id) => {
  const URL = `http://localhost:3000/api/tasks/${id ?? ""}`;

  return new Promise((resolve, reject) => {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Assets: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => resolve({ status: Status.OK, data }))
      .catch((err) => reject(err));
  });
};
