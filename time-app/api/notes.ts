export const submitNotesInfo = async (
  url: string,
  payload: { body: string; time: string }
) => {
  const { data: submitNoteResponse, error: submitNoteErrorResponse } =
    await useFetch(url, {
      method: "POST",
      body: payload.body,
      headers: {
        "X-HttpStatus-Response-Note-Time": payload.time,
      },
    });

  return {
    submitNoteResponse,
    submitNoteErrorResponse,
  };
};
