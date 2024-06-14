"use client";
import { FormEventHandler, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../Modal/Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTasks = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    // console.log("Value: ", newTaskValue);
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-active btn-accent w-full text-white text-xl hover:bg-purple-800">
        Add new task <FaPlus className="ml-2" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input value={newTaskValue} onChange={(e) => setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
            <button type="submit" className="btn bg-green-600 text-white hover:bg-green-800">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTasks;
