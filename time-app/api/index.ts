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
    transform: (data: any) => {
      return snakeToCamel(data);
    },
  });
  return {
    data,
    error,
    pending,
  };
};

export const submitNotesInfo = async (
  url: string,
  payload: { body: string; time: string }
) => {
  const { data, error, pending } = await useFetch(url, {
    method: "POST",
    body: payload.body,
    headers: {
      "X-HttpStatus-Response-Note-Time": payload.time,
    },
  });

  return {
    data,
    error,
    pending,
  };
};
