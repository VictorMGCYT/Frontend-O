import { getToken } from "@/app/helpers/getToken";
import { NEXT_PUBLIC_API } from "@/config/envs.config";

export const deleteServicio = async (servicioID: string) => {
  const { token } = await getToken();

  console.log("Token de dentitsa " + {token});

  try {
    const response = await fetch(`${NEXT_PUBLIC_API}/Servicios/Delete/${servicioID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};