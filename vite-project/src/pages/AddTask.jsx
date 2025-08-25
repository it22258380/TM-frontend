import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import t3 from "../assets/t3.jpg";

function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "Medium",
    isCompleted: false,
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // get JWT
      const res = await axios.post(
        "http://localhost:5000/api/tasks/add",
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      setTask({
        title: "",
        description: "",
        due_date: "",
        priority: "Medium",
        isCompleted: false,
      });
      navigate("/list");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding task");
    }
  };

  return (
    <div>
      <img
        src={t3}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      />
      <div className=" flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-md bg-white p-8 shadow-xl rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Add New Task
          </h2>

          {message && (
            <p className="mb-4 text-center text-sm text-green-600">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
                placeholder="Enter task title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
                rows="3"
                placeholder="Enter task description"
                required
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="due_date"
                value={task.due_date}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Completed */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isCompleted"
                checked={task.isCompleted}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="text-gray-700 font-medium">
                Mark as Completed
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
