export const getTimezones = (url: string) => {
  const { data, error, pending } = useFetch(url);
  return {
    data,
    error,
    pending,
  };
};

export const getSelectedDateTime = async (baseUrl: string, area: string, location: string) => {
   const url = `${baseUrl}/${area}/${location}` 
  const { data, error, pending } = await useFetch(url);
  return {
    data,
    error,
    pending,
  };
};

export const submitTimezoneData = async (
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
