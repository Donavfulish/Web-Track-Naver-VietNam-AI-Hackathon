import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ProjectFormData {
  name: string;
  description: string;
  final_deadline: string;
  img_src: string;
}

interface ProjectFormProps {
  formData: ProjectFormData;
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
      {/* Project Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          className="border-gray-400 border-[1px]"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Enter project name"
          required
          maxLength={70}
        />
        <p className="text-xs text-muted-foreground">
          {formData.name.length}/70
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          className="border-gray-400 border-[1px] resize-none break-words w-full max-w-100 overflow-y-auto"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe your project"
          rows={3}
          required
          maxLength={200}
        />
        <p className="text-xs text-muted-foreground">
          {formData.description.length}/200
        </p>
      </div>

      {/* Final Deadline */}
      <div className="space-y-2">
        <Label htmlFor="deadline">Final Deadline</Label>
        <Input
          id="deadline"
          className="border-gray-400 border-[1px]"
          type="date"
          value={formData.final_deadline}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => onChange("final_deadline", e.target.value)}
          required
        />
      </div>

      {/* Image */}
      <div className="space-y-2">
        <Label htmlFor="image">Project Image</Label>
        <Input
          id="image"
          className="border-gray-400 border-[1px]"
          value={formData.img_src}
          onChange={(e) => onChange("img_src", e.target.value)}
          placeholder="Enter Image URL"
        />
        {formData.img_src && (
          <div className="flex justify-center mt-2">
            <LazyLoadImage
              alt="Preview"
              src={formData.img_src}
              className="w-60 h-40 object-cover rounded"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          disabled={loading}
        >
          <Check className="h-4 w-4 mr-2" />
          {submitText}
        </Button>
      </div>
    </form>
  );
}
