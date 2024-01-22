import React, { useContext, useEffect } from "react";
import Context from "../main";
import { useState } from "react";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import axios from "axios";
import { server } from "../main";
import { Navigate } from "react-router-dom";
const Home = () => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const { isLoggedIn, user } = useContext(Context);

  const handleUpdate = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `${server}/tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res + "updated");
      setIsLoading(false);
      setRefresh((prev) => !prev);
      toast.success(res.data.message);
    } catch (err) {
      console.log(res + "updated");
      setIsLoading(false);
      toast.error(err.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });
      console.log(res + "delete");
      setIsLoading(false);
      toast.success(res.data.message);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(res + "delete");
      setIsLoading(false);
      toast.error(err.response.data.message);
    }
  };

  const handleItemEntry = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${server}/tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );

      console.log(user + "entry");
      setIsLoading(false);
      toast.success(res.data.message);
      setRefresh((prev) => !prev);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(user + "entry");
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(
        `${server}/tasks/all`,

        { withCredentials: true }
      )
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <div>
      <form onSubmit={handleItemEntry}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button disabled={isLoading} type="submit">
          Add
        </button>
      </form>
      <div>
        {tasks.map((item) => (
          <TodoItem
            id={item._id}
            key={item._id}
            isCompleted={item.isCompleted}
            Update={handleUpdate}
            Delete={handleDelete}
            title={item.title}
            description={item.description}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
