import React from 'react';

// Định nghĩa props cho component
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description?: string; // Dấu ? cho biết thuộc tính này là tùy chọn (optional)
}

