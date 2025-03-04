import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = true
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-screen w-screen flex items-center justify-center">
          <div className="w-full h-full p-4 md:px-6 flex items-center justify-center">
            {children}
          </div>
        </ScrollArea>
      ) : (
        <div className="w-full h-screen p-4 md:px-6 flex items-center justify-center">
          {children}
        </div>
      )}
    </>
  );
}