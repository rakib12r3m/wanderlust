'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "../ui/button";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

const DeleteDestinationDialog = ({ id }:{id:string}) => {
  const handleDeleteDestination = async () => {
    const res = await fetch(
      `http://localhost:8000/destination/${id}`,
      {
        method: "DELETE",
      },
    );
    await res.json();
    redirect('/destinations')
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            className={buttonVariants({
              variant: "outline",
              className:
                "border-destructive/40 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive",
            })}
          >
            <Trash2 />
            Delete
          </Button>
        }
      >
        Show Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestinationDialog;
