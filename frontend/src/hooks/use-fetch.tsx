import { useQuery } from 'react-query';
import axios from 'axios';

/**
 * custom hook for fetching data
 * @param key unique identifier for query
 * @param queryUrl query route, base url has been specified
 * @param token optional user token to access protected route
 * @returns an observers for isLoading, error, isFetching and data
 */

export const useFetch = (key: string, queryUrl: string, token?: string) => {
  return useQuery(
    key,
    async () => {
      const response = await axios({
        method: 'get',
        url: `https://music-box-b.herokuapp.com/api/v1/music-box-api/${queryUrl}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    {
      // prevents background data refetch when browser / window is refocused
      refetchOnWindowFocus: false,
    }
  );
};
