// Định nghĩa props cho component
interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    description?: string; // Dấu ? cho biết thuộc tính này là tùy chọn (optional)
}

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    description
}: DeleteConfirmationModalProps) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <div className="text-xl font-semibold mb-4 text-gray-800">Xác nhận xóa</div>

                {description && (
                    <div className="text-gray-600 mb-6">
                        {description}
                    </div>
                )}

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                        Hủy
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};
