import { useState, useEffect } from "react";

export default function useAsync(handler, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const act = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const data = await handler(...args);
      setData(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response);
      setLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    if (immediate) {
      act();
    }
  }, []);

  return {
    data,
    loading,
    error,
    act,
  };
}
