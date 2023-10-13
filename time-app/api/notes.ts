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
