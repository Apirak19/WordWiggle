"use client";
import { useState, useRef, useCallback } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Layout } from "@/components/Layout";
import { Item } from "@/components/Item";

export interface Task {
  id: UniqueIdentifier;
  title: string;
}
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const [availableTasks, setAvailableTasks] = useState<Task[]>([
    { id: "1", title: "you" },
    { id: "2", title: "I" },
    { id: "3", title: "most" },
    { id: "4", title: "much" },
    { id: "5", title: "love" },
    { id: "6", title: "more" },
    { id: "7", title: "the" },
  ]);

  const originalOrder = useRef<Task[]>([
    { id: "2", title: "I" },
    { id: "5", title: "love" },
    { id: "1", title: "you" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id: UniqueIdentifier): number =>
    tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over?.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over?.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const handleTaskClick = (task: Task, isSelected: boolean) => {
    // if (!tasks.find((t) => t.id === task.id)) {
    //   setTasks((prev) => [...prev, task]);
    // }
    if (isSelected) {
      // Remove from selectedTasks and add to availableTasks
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      // setTasks((prev) => {
      //   const updated = prev.filter((t) => t.id !== task.id);
      //   return updated;
      // });
      setAvailableTasks((prev) => [...prev, task]);
      console.log("clickedRemoved");
      console.log("selectedTasks", tasks);
      console.log("availableTasks", availableTasks);
    } else {
      // Add to selectedTasks and remove from availableTasks
      setAvailableTasks((prev) => prev.filter((t) => t.id !== task.id));
      setTasks((prev) => [...prev, task]);
      console.log("clickedAdded");
      console.log("selectedTasks", tasks);
      console.log("availableTasks", availableTasks);
    }
  };

  const checkOrder = useCallback(() => {
    const currentOrder = tasks.map((task) => task.id);
    const expectedOrder = originalOrder.current.map((task) => task.id);

    return JSON.stringify(currentOrder) === JSON.stringify(expectedOrder);
  }, [tasks]);

  const resetTasks = () => {
    setAvailableTasks([
      { id: "1", title: "you" },
      { id: "2", title: "I" },
      { id: "3", title: "most" },
      { id: "4", title: "much" },
      { id: "5", title: "love" },
      { id: "6", title: "more" },
      { id: "7", title: "the" },
    ]);
    setTasks([]);
  };
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <header className="w-full flex flex-col gap-4">
        <h1 className="text-5xl text-center">Word Wiggle</h1>
        <p className="text-lg text-center">
          Rearrange the sentence in the correct order
        </p>
      </header>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Layout
          tasks={tasks}
          availableTasks={availableTasks}
          onTaskClick={handleTaskClick}
        />
      </DndContext>
      <article className="flex gap-10">
        <button
          onClick={() =>
            alert(checkOrder() ? "Correct Order" : "Incorrect Order")
          }
        >
          Check Order
        </button>
        <button
          onClick={resetTasks}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Reset
        </button>
      </article>
    </main>
  );
}
