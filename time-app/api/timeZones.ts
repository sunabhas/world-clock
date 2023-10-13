import { snakeToCamel } from "../utils";

export const getTimezones = (url: string) => {
  const { data } = useFetch(url);
  const listOfTimezones = toRaw(data.value);
  return { listOfTimezones };
};

export const getSelectedDateTime = async (
  baseUrl: string,
  area: string,
  location: string
) => {
  const url = `${baseUrl}/${area}/${location}`;
  const { data, error, pending } = await useFetch(url, {
    transform: (data) => {
      return snakeToCamel(data as never);
    },
  });
  return {
    data,
    error,
    pending,
  };
};
