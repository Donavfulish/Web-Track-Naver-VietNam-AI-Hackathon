import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Check } from "lucide-react"

interface NewProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (projectData: any) => void
}

export default function NewProjectModal({ isOpen, onClose, onSubmit }: NewProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    finalDeadline: "",
    img_src: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.description && formData.finalDeadline && formData.) {
      onSubmit(formData)
      setFormData({ name: "", description: "", finalDeadline: "", img_src: "" })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">Create New Project</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
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
              type="date"
              value={formData.finalDeadline}
              onChange={(e) => handleChange("finalDeadline", e.target.value)}
              required
            />
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
    </Dialog>
  )
}
