import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { FileText, AlertTriangle } from "lucide-react"

interface DeleteConfirmationDialogProps {
  showDeleteModal: boolean
  setShowDeleteModal: (show: boolean) => void
  licenseToDelete: any
  confirmDeleteLicense: () => void
  cancelDeleteLicense: () => void
}

export const DeleteConfirmationDialog = ({
  showDeleteModal,
  setShowDeleteModal,
  licenseToDelete,
  confirmDeleteLicense,
  cancelDeleteLicense
}: DeleteConfirmationDialogProps) => {
  return (
    <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg">Delete License</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600">
                This action cannot be undone. This will permanently delete the license and remove all associated data.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        
        {licenseToDelete && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{licenseToDelete.licenseType}</p>
                <p className="text-sm text-gray-600">License #{licenseToDelete.id}</p>
                <p className="text-xs text-gray-500">${licenseToDelete.contractValue.toLocaleString()} • {licenseToDelete.status}</p>
              </div>
            </div>
          </div>
        )}
        
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelDeleteLicense}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={confirmDeleteLicense}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete License
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
