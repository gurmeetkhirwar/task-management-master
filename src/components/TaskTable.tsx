import { useDispatch } from 'react-redux';
import { Task } from '../types';
import { deleteTask, markComplete } from '../features/taskSlice';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

interface TaskTableProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
}

const TaskTable = ({ tasks, onEdit }: TaskTableProps) => {
    const dispatch = useDispatch();
    const today = new Date();

    const getStatusStyle = (status: Task['status'], dueDate: string): string => {
        const due = new Date(dueDate);
        if (due < today) return 'bg-red-100';
        if (status === 'Completed') return 'bg-green-100';
        if (status === 'Pending') return 'bg-yellow-100';
        return '';
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-x border-gray-200">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-x border-gray-200">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-x border-gray-200">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-x border-gray-200">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-x border-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <tr key={task.id} className={getStatusStyle(task.status, task.dueDate)}>
                            <td className="px-6 py-4 whitespace-normal border-x border-gray-200">{task.title}</td>
                            <td className="px-6 py-4 whitespace-normal border-x border-gray-200">{task.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200">{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200">{task.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap border-x border-gray-200 flex gap-5">
                                <button onClick={() => onEdit(task)} className="text-blue-600 hover:text-blue-900">
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => dispatch(deleteTask(task.id))}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    <FaTrash />
                                </button>
                                {task.status !== 'Completed' && (
                                    <button
                                        onClick={() => dispatch(markComplete(task.id))}
                                        className="text-green-600 hover:text-green-900"
                                    >
                                        <FaCheck />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;