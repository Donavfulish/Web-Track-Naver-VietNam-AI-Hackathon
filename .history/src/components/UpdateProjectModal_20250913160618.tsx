import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
interface UpdateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Task; // hoặc Project type
}

export default function UpdateProjectModal({ isOpen, onClose, project }: UpdateProjectModalProps) {
  const updateProject = useProjectStore((state) => state.updateProject);
  const [formData, setFormData] = useState(project);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProject(formData.id, formData);
      toast.success("Project updated successfully!");
      onClose();
    } catch (err) {
      toast.error("Failed to update project. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
        </DialogHeader>
        <ProjectForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitText="Update Project"
        />
      </DialogContent>
    </Dialog>
  );
}
