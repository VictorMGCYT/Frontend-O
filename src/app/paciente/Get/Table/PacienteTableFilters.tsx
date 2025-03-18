import { FilterInput } from "@/components/custom/table/FilterInput";
import { Button } from "@/components/ui/button";
import AlertDialogTable from "@/components/custom/table/AlertDialogTable";

interface DentistTableFiltersProps {
  paciente: string;
  setPaciente: React.Dispatch<React.SetStateAction<string>>;
  apellidos: string;
  setApellidos: React.Dispatch<React.SetStateAction<string>>;
  telefono: string;
  setTelefono: React.Dispatch<React.SetStateAction<string>>;
  domicilio: string;
  setDomicilio: React.Dispatch<React.SetStateAction<string>>;
  creacion: string;
  setCreacion: React.Dispatch<React.SetStateAction<string>>;
  updateQueryParams: (updates: Record<string, string>) => void;
}

const handleRealizar = async() =>{

}

const handleAgregar = async () => {

  <AlertDialogTable
          alertAction={handleRealizar}
          title={'Eliminar Dentista'}
          description={'¿Estás seguro de que deseas eliminar a este dentista?'}
          cancel={'Cancelar'}
          continueText={'Continuar'}
          textAction={'Eliminar'}
        />
}
//E:\UNIVERSIDAD\OCTAVO SEMESTRE\Nueva carpeta\Dentista\Front-end\Frontend-O\src\app\paciente\paciente.tsx


const DentistFilters: React.FC<DentistTableFiltersProps> = ({
  paciente,
  setPaciente,
  apellidos,
  setApellidos,
  telefono,
  setTelefono,
  domicilio,
  setDomicilio,
  creacion,
  setCreacion,
  updateQueryParams,

}) => {
  return (
    <div className="flex items-center py-4">
      <div className="flex justify-center gap-12 flex-wrap w-full">
        <FilterInput
          placeholder="Nombres"
          value={paciente}
          onChange={(event) => setPaciente(event.target.value)}
          onEnter={() => updateQueryParams({ paciente, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Apellidos"
          value={apellidos}
          onChange={(event) => setApellidos(event.target.value)}
          onEnter={() => updateQueryParams({ apellidos, offset: "0" })}
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
          placeholder="Creación"
          value={creacion}
          onChange={(event) => setCreacion(event.target.value)}
          onEnter={() => updateQueryParams({ creacion, offset: "0" })}
          className="w-30"
        />

        <Button onClick={handleAgregar} className="">Agregar Paciente</Button>
      </div>
    </div>
  );
};

export default DentistFilters;