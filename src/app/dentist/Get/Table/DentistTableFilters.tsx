import { FilterInput } from "@/components/custom/table/FilterInput";

interface DentistTableFiltersProps {
  dentista: string;
  setDentista: React.Dispatch<React.SetStateAction<string>>;
  telefono: string;
  setTelefono: React.Dispatch<React.SetStateAction<string>>;
  domicilio: string;
  setDomicilio: React.Dispatch<React.SetStateAction<string>>;
  cedula: string;
  setCedula: React.Dispatch<React.SetStateAction<string>>;
  creacion: string;
  setCreacion: React.Dispatch<React.SetStateAction<string>>;
  updateQueryParams: (updates: Record<string, string>) => void;
}

const DentistFilters: React.FC<DentistTableFiltersProps> = ({
  dentista,
  setDentista,
  telefono,
  setTelefono,
  domicilio,
  setDomicilio,
  cedula,
  setCedula,
  creacion,
  setCreacion,
  updateQueryParams,
}) => {
  return (
    <div className="flex items-center py-4">
      <div className="flex justify-center gap-12 flex-wrap w-full">
        <FilterInput
          placeholder="Dentista"
          value={dentista}
          onChange={(event) => setDentista(event.target.value)}
          onEnter={() => updateQueryParams({ dentista, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Teléfono"
          value={telefono}
          onChange={(event) => setTelefono(event.target.value)}
          onEnter={() => updateQueryParams({ telefono, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Domicilio"
          value={domicilio}
          onChange={(event) => setDomicilio(event.target.value)}
          onEnter={() => updateQueryParams({ domicilio, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Cédula"
          value={cedula}
          onChange={(event) => setCedula(event.target.value)}
          onEnter={() => updateQueryParams({ cedula, offset: "0" })}
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