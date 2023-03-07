import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
}
