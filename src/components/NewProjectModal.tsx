import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProjectStore } from "@/store/projectStore";
import { ProjectForm } from "./ProjectForm";
import { toast, ToastContainer } from "react-toastify";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const addProject = useProjectStore((state) => state.addProject);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    final_deadline: "",
    img_src: 'https://res.cloudinary.com/djyicm00q/image/upload/v1757839076/default-featured-image.png_bqipck.jpg',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProject(formData);
      toast.success("Project created successfully!");
      setFormData({ name: "", description: "", final_deadline: "", img_src: 'https://res.cloudinary.com/djyicm00q/image/upload/v1757839076/default-featured-image.png_bqipck.jpg' });
      onClose();
    } catch (err) {
      toast.error("Failed to create project. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <ProjectForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitText="Create Project"
        />
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
}
