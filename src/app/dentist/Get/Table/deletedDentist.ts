import { getToken } from "@/app/helpers/getToken";
import { NEXT_PUBLIC_API } from "@/config/envs.config";

export const deletedPet = async (petId: string) => {
  const { token } = await getToken();

  try {
    const response = await fetch(`${NEXT_PUBLIC_API}/pets/delete/${petId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message[0]);
    }
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};