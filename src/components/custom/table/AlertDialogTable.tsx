import React from "react";
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
import { Button } from "@/components/ui/button";

interface Props{
  alertAction: () => Promise<void>;
  className?:string;
  title:string;
  description:string;
  cancel:string;
  continueText: string;
  textAction:string;
}
const AlertDialogTable: React.FC<Props> = ({ alertAction, className, title, description, cancel, continueText, textAction  }) => {
  return (
    
    <div className="w-full">
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button className={`${className} w-full justify-start pl-3 bg-transparent font-normal dark:text-white text-black shadow-none hover:bg-accent`}>{textAction}</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
          {description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{cancel}</AlertDialogCancel>
        <AlertDialogAction onClick={alertAction}>{continueText}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  </div>
  )
}

export default AlertDialogTable
