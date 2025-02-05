import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Task, TaskFormData } from '../types';
import { addTask, editTask } from '../features/taskSlice';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskToEdit?: Task | null;
}

const TaskModal = ({ isOpen, onClose, taskToEdit }: TaskModalProps) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        dueDate: '',
        status: 'Pending',
    });
    const [errors, setErrors] = useState<Partial<TaskFormData>>({});

    useEffect(() => {
        if (taskToEdit) {
            setFormData(taskToEdit);
        } else {
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                status: 'Pending',
            });
        }
    }, [taskToEdit]);

    const validateForm = (): boolean => {
        const newErrors: Partial<TaskFormData> = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
        if (new Date(formData.dueDate) < new Date()) newErrors.dueDate = 'Due date cannot be in the past';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const task: Task = {
            ...formData,
            id: taskToEdit?.id || Date.now(),
        };

        if (taskToEdit) {
            dispatch(editTask(task));
        } else {
            dispatch(addTask(task));
        }
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            status: 'Pending',
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            className="w-full p-2 border rounded"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Due Date</label>
                        <input
                            type="date"
                            className={`w-full p-2 border rounded ${errors.dueDate ? 'border-red-500' : ''}`}
                            value={formData.dueDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        />
                        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;