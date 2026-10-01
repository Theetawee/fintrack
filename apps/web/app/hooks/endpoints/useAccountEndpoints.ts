import useAxios from "../useAxios";

const useAccountEndpoints = () => {
    const api = useAxios();

    const getUser = async () => {
        const response = await api.get("/accounts/me/");
        return response.data;
    };

    return { getUser };
};

export default useAccountEndpoints;
