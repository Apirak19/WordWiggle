import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../app/page";
import { Item } from "./Item";

interface LayoutProps {
  tasks: Task[];
  availableTasks: Task[];
  onTaskClick: (task: Task, isSelected: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  tasks,
  availableTasks,
  onTaskClick,
}) => {
  return (
    <div className=" flex flex-col  w-full max-w-[600px]">
      <div className=" flex flex-col gap-4 w-full h-[120px] p-4">
        <h2>Available Tasks</h2>
        <article className="flex gap-4">
          {availableTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onTaskClick(task, false)}
              className="task-choice border-slate-900 border-2 py-2 px-4 rounded-md cursor-pointer"
            >
              {task.title}
            </div>
          ))}
        </article>
      </div>
      <div className=" flex flex-col gap-4 w-full h-[120px] p-4">
        <h2>Selected Tasks</h2>
        <article className="flex gap-4">
          <SortableContext
            items={tasks.map((task) => task.id)}
            strategy={horizontalListSortingStrategy}
          >
            {tasks.map((task) => (
              <Item
                key={task.id}
                id={task.id}
                title={task.title}
                // onTaskClick={onTaskClick}
                onClick={() => onTaskClick(task, true)}
              />
            ))}
          </SortableContext>
        </article>
      </div>
    </div>
  );
};
