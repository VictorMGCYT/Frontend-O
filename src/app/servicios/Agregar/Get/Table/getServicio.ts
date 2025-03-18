import { getToken } from "@/app/helpers/getToken";
import { NEXT_PUBLIC_API } from "@/config/envs.config";

export async function getServicio(queryParams: URLSearchParams) {
    const { token } = await getToken();
    console.log(token);

    try {
        const response = await fetch(`${NEXT_PUBLIC_API}/servicios/get/?${queryParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}