import { Input } from "@/components/ui/input";

export function FilterInput({ placeholder, value, onChange, onEnter, className }: { placeholder: string; value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; onEnter: () => void; className?: string }) {
    return (
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onEnter();
          }
        }}
        className={`max-w-sm placeholder:font-semibold md:placeholder:text-sm placeholder:text-sm ${className}`}
      />
    );
  }