import { getToken } from "@/app/helpers/getToken";
import { NEXT_PUBLIC_API } from "@/config/envs.config";

export const updateServicio = async (servicioId: string, data: {
    servicio_nombre: string,
    servicio_precio: 0,
}) => {
  const { token } = await getToken();

  try {
    const response = await fetch(`${NEXT_PUBLIC_API}/servicios/update/${servicioId}`, {
      method: "PATCH", 
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