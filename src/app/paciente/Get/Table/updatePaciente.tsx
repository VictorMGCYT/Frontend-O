import { getToken } from "@/app/helpers/getToken";
import { NEXT_PUBLIC_API } from "@/config/envs.config";

export const updatePaciente = async (pacienteId: string, data: {
  paciente_nombres: string;
  paciente_apellidos: string;
  paciente_telefono: string;
  paciente_domicilio: string;
}) => {
  const { token } = await getToken();

  try {
    const response = await fetch(`${NEXT_PUBLIC_API}/paciente/update/${pacienteId}`, {
      method: "PATCH", // o "PATCH" dependiendo de tu API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json(); // Retorna los datos actualizados del paciente
  } catch (error: any) {
    console.error("Error updating paciente:", error);
    throw error;
  }
};