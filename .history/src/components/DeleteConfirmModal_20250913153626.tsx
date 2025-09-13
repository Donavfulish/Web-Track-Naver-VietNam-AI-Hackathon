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
            <DialogTitle className="text-xl font-semibold">Delete Confirm</DialogTitle>
          </div>
        </DialogHeader>

                {description && (
                    <div className="text-gray-600 mb-6">
                        {description}
                    </div>
                )}
                <div className="flex justify-end space-x-4"></div>
                <Button
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDelete(true)
                  }}
                >
                  <Trash className="w-2 h-2" />
                </Button>
                </div>
                <div className="flex justify-end space-x-4">
                    <Button
                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                        onClick={̣(e) => {
                            e.stopPropagetion()
                            onConfirm()
                        }}
                    >
                        Xóa
                    </Button>
        </DialogContent>
    </Dialog>
    );
};
