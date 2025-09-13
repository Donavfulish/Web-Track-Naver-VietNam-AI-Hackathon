import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Check } from "lucide-react"
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: {
    name: string;
    description: string;
    finalDeadline: string;
    img_src?: string;
  }) => void;
}


export default function NewProjectModal({ isOpen, onClose, onSubmit }: NewProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    finalDeadline: "",
    img_src: "",
  })


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.finalDeadline || !formData.img_src) return;


  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">Create New Project</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              className="border-gray-400 border-[1px]"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter project name"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="border-gray-400 border-[1px]"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe your project"
              rows={3}
              required
            />
          </div>

          {/* Final Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline">Final Deadline</Label>
            <Input
              id="deadline"
              className="border-gray-400 border-[1px]"
              type="date"
              value={formData.finalDeadline}
              onChange={(e) => handleChange("finalDeadline", e.target.value)}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <Label htmlFor="image">Project Image</Label>
            <Input
              id="image"
              className="border-gray-400 border-[1px]"
              value={formData.img_src}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="Image URL"
              required
            />
              <LazyLoadImage
                alt={'Preview'}
                src={formData.img_src|| "/placeholder.svg"} // full URL
                className="w-32 h-32 object-cover rounded mt-2"
              />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : <><Check className="h-4 w-4" /> Create Project</>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
