import { useQueryClient } from "@tanstack/react-query";

export const invalidateQuery = (key: string) => {
    const client = useQueryClient();

    client.invalidateQueries([key])
}