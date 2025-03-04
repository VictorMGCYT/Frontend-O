import { getToken } from "@/app/helpers/getToken";
import { NEXT_PUBLIC_API } from "@/config/envs.config";

export const deleteDentist = async (dentisId: string) => {
  const { token } = await getToken();

  try {
    const response = await fetch(`${NEXT_PUBLIC_API}/dentista/delete/${dentisId}`, {
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