"use client";
import { ITask } from "@/types/tasks";
import React, { FormEventHandler, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Modal from "../Modal/Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    // console.log("Value: ", newTaskValue);
    // setTaskToEdit("");
    setModalOpenEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setModalOpenDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id} className="hover">
      <td className="w-full ">{task.text}</td>
      <td className="flex gap-5">
        <FaRegEdit onClick={() => setModalOpenEdit(true)} cursor="pointer" className="hover:text-blue-700 text-blue-500" size={20} />
        <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input value={taskToEdit} onChange={(e) => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
              <button type="submit" className="btn text-white hover:bg-blue-800 bg-blue-500">
                Update
              </button>
            </div>
          </form>
        </Modal>

        <RiDeleteBin6Line onClick={() => setModalOpenDelete(true)} cursor="pointer" className="hover:text-red-700 text-red-500" size={22} />
        <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
          <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="hover:bg-red-800 text-white btn bg-red-500">Yes</button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
