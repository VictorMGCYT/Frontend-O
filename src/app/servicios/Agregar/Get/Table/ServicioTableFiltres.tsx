import { FilterInput } from "@/components/custom/table/FilterInput";

interface DentistTableFiltersProps {
  servicio: string;
  setServicio: React.Dispatch<React.SetStateAction<string>>;
  precio: string;
  setPrecio: React.Dispatch<React.SetStateAction<string>>;
  
  creacion: string;
  setCreacion: React.Dispatch<React.SetStateAction<string>>;
  updateQueryParams: (updates: Record<string, string>) => void;
}

const DentistFilters: React.FC<DentistTableFiltersProps> = ({
  servicio,
  setServicio,
  precio,
  setPrecio,
  creacion,
  setCreacion,
  updateQueryParams,
}) => {
  return (
    <div className="flex items-center py-4">
      <div className="flex justify-center gap-12 flex-wrap w-full">
        <FilterInput
          placeholder="Servicio"
          value={servicio}
          onChange={(event) => setServicio(event.target.value)}
          onEnter={() => updateQueryParams({ servicio, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Precio"
          value={precio}
          onChange={(event) => setPrecio(event.target.value)}
          onEnter={() => updateQueryParams({ precio, offset: "0" })}
          className="w-30"
        />
      
        <FilterInput
          placeholder="Creación"
          value={creacion}
          onChange={(event) => setCreacion(event.target.value)}
          onEnter={() => updateQueryParams({ creacion, offset: "0" })}
          className="w-30"
        />
      </div>
    </div>
  );
};

export default DentistFilters;