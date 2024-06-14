import AddTasks from "./components/AddTasks/AddTasks";
import ToDoList from "./components/ToDoList/ToDoList";
import { getAllTodos } from "@/api";

export default async function Home() {
  const tasks = await getAllTodos();
  console.log("Tasks: ", tasks);

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTasks />
      </div>
      <div>
        <ToDoList tasks={tasks} />
      </div>
    </main>
  );
}
