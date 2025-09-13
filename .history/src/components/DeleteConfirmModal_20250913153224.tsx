import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
        <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">Delete </DialogTitle>
          </div>
        </DialogHeader>

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
        </DialogContent>
    </Dialog>
    );
};
