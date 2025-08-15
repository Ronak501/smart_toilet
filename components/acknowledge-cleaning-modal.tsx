"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface AcknowledgeCleaningModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  toiletName: string
}

export function AcknowledgeCleaningModal({ isOpen, onClose, onConfirm, toiletName }: AcknowledgeCleaningModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Acknowledge Cleaning</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            Has {toiletName} been cleaned and inspected?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
