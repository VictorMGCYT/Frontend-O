import { useRouter, useSearchParams } from 'next/navigation';


export function useQueryParams() {

    const router = useRouter();
    const searchParams = useSearchParams();
  
    const updateQueryParams = (updates: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      router.push(`?${newParams.toString()}`);
    };
  
    return { searchParams, updateQueryParams };
  }
  