import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ProjectFormProps {
  formData: {
    name: string;
    description: string;
    final_deadline: string;
    img_src: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  loading?: boolean;
}

export function ProjectForm({
  formData,
  onChange,
  onSubmit,
  submitText,
  loading = false,
}: ProjectFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          className="border-gray-400 border-[1px]"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Enter project name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          className="border-gray-400 border-[1px]"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe your project"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Final Deadline</Label>
        <Input
          id="deadline"
          className="border-gray-400 border-[1px]"
          type="date"
          value={formData.final_deadline}
          onChange={(e) => onChange("final_deadline", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Project Image</Label>
        <Input
          id="image"
          className="border-gray-400 border-[1px]"
          value={formData.img_src}
          onChange={(e) => onChange("img_src", e.target.value)}
          placeholder="Enter Image URL"
          required
        />
        {formData.img_src && (
          <div className="flex justify-center mt-2">
            <img
              alt="Preview"
              src={formData.img_src}
              className="w-60 h-40 object-cover rounded"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {submitText}
        </Button>
      </div>
    </form>
  );
}
