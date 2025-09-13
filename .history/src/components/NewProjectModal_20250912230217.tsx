import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useProjectStore } from "@/store/projectStore";
import { ToastContainer, toast } from 'react-toastify';

interface NewProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const addProject = useProjectStore((state) => state.addProject)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    final_deadline: "",
    img_src: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.description || !formData.final_deadline || !formData.img_src) return

    try {
      await addProject(formData)

      toast.success("Project created successfully!");

      setFormData({ name: "", description: "", final_deadline: "", img_src: "" })
      onClose()
    } catch (err) {
      toast.error("Failed to create project. Please try again.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">Create New Project</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={formData.final_deadline}
              onChange={(e) => handleChange("final_deadline", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Project Image</Label>
            <Input
              id="image"
              className="border-gray-400 border-[1px]"
              value={formData.img_src}
              onChange={(e) => handleChange("img_src", e.target.value)}
              placeholder="Enter Image URL"
              required
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
            >
              <Check className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}
