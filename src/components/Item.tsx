import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";

interface ItemProps {
  id: UniqueIdentifier;
  title: string;
  //   onTaskClick: (isSelected: boolean) => void;
  onClick: () => void;
}

export const Item: React.FC<ItemProps> = ({ id, title, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task bg-slate-900 py-2 px-4 rounded-md text-white"
      onClick={onClick}
    >
      {title}
    </div>
  );
};
