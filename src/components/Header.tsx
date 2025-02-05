interface HeaderProps {
    handleModal: () => void;
}
const Header = ({ handleModal }: HeaderProps) => {

    const handleAddTask = () => {
        handleModal()
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
                <button
                    onClick={handleAddTask}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Add New Task
                </button>
            </div>
        </header>
    )
}

export default Header