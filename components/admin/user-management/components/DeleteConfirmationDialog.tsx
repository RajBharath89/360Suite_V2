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
import { User, AlertTriangle } from "lucide-react"

interface DeleteConfirmationDialogProps {
  showDeleteModal: boolean
  setShowDeleteModal: (show: boolean) => void
  userToDelete: any
  confirmDeleteUser: () => void
  cancelDeleteUser: () => void
}

export const DeleteConfirmationDialog = ({
  showDeleteModal,
  setShowDeleteModal,
  userToDelete,
  confirmDeleteUser,
  cancelDeleteUser
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
              <AlertDialogTitle className="text-lg">Delete User</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600">
                This action cannot be undone. This will permanently delete the user and remove all associated data.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        
        {userToDelete && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{userToDelete.fullName}</p>
                <p className="text-sm text-gray-600">{userToDelete.email}</p>
                <p className="text-xs text-gray-500">{userToDelete.role} • {userToDelete.status}</p>
              </div>
            </div>
          </div>
        )}
        
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelDeleteUser}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={confirmDeleteUser}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
