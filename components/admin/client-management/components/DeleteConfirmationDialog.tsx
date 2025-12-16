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

interface DeleteConfirmationDialogProps {
  showDeleteModal: boolean
  setShowDeleteModal: (show: boolean) => void
  clientToDelete: any
  confirmDeleteClient: () => void
  cancelDeleteClient: () => void
}

export const DeleteConfirmationDialog = ({
  showDeleteModal,
  setShowDeleteModal,
  clientToDelete,
  confirmDeleteClient,
  cancelDeleteClient
}: DeleteConfirmationDialogProps) => {
  return (
    <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Client</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{clientToDelete?.companyName}</strong>? 
            This action cannot be undone and will permanently remove all client data including contacts, services, and assets.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelDeleteClient}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={confirmDeleteClient}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Client
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
