import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import TaskModal from './components/TaskModal';
import TaskTable from './components/TaskTable';
import { RootState } from './store';
import { Task } from './types';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  }




  return (
    <div className="min-h-screen bg-gray-100">
      <Header handleModal={handleModal} />
      <main className="max-w-7xl mx-auto py-6 px-4">
        {tasks.length > 0 ? (
          <TaskTable tasks={tasks} onEdit={handleEdit} />
        ) : (
          <p className="text-center text-gray-500">No tasks found. Add your first task!</p>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={selectedTask}
      />
    </div>
  );
};

export default App;