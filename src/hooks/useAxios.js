// hooks/useAxios.js
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";

export const useAxios = (method, url, data = null) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        let res;
        if (method === "get") {
          res = await axiosInstance.get(url);
        } else if (method === "post") {
          res = await axiosInstance.post(url, data);
        } else if (method === "put") {
          res = await axiosInstance.put(url, data);
        } else if (method === "delete") {
          res = await axiosInstance.delete(url);
        }
        setResponse(res.data); // Set the response data
      } catch (err) {
        setError(err); // Handle errors
      } finally {
        setLoading(false); // Set loading to false when request is complete
      }
    };

    makeRequest();
  }, [method, url, data]);

  return { response, loading, error };
};

export const useLazyAxios = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ref to keep track of debounce timeout ID
  const debounceRef = useRef(null);
  const controllerRef = useRef(null); // Reference to the controller for cancellation

  // Async function to execute the API call
  const act = async (method, url, data) => {
    if (controllerRef.current) {
      controllerRef.current.abort(); // Cancel previous request if it's still ongoing
    }
    setLoading(true);

    // Create a new abort controller
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    // Clear the previous debounce timeout to avoid unwanted requests
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set up a new debounce timeout
    debounceRef.current = setTimeout(async () => {
      try {
        let res;
        if (method === 'get') {
          res = await axiosInstance.get(url, { signal });
        } else if (method === 'post') {
          res = await axiosInstance.post(url, data, { signal });
        } else if (method === 'put') {
          res = await axiosInstance.put(url, data, { signal });
        } else if (method === 'delete') {
          res = await axiosInstance.delete(url, { signal });
        }

        setResponse(res.data); // Update response state
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err); // Handle errors that aren't caused by the abort
        }
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce delay
  };

  return { act, response, loading, error };
};
