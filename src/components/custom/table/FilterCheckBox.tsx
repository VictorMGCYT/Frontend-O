import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function FilterCheckbox({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
    return (
      <div className="flex w-full">
        <Label className="text-sm w-28">{label}</Label>
        <Checkbox className='size-5' checked={checked} onClick={onClick}>
        </Checkbox>
      </div>
    );
  }