import { snakeToCamel } from "../utils";

export const getTimezones = (url: string) => {
  const { data, error: timeZoneApiError } = useFetch(url);
  const listOfTimezones = toRaw(data.value);
  return { listOfTimezones, timeZoneApiError };
};

export const getSelectedDateTime = async (
  baseUrl: string,
  area: string,
  location: string
) => {
  const url = `${baseUrl}/${area}/${location}`;
  const { data: dateTimeData, error: dateTimeDataApiError } = await useFetch(
    url,
    {
      transform: (data) => {
        return snakeToCamel(data as never);
      },
    }
  );
  return {
    dateTimeData,
    dateTimeDataApiError,
  };
};
