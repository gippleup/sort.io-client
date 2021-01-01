import React from "react"

export const usePrevious = <T>(value: T, deps?: React.DependencyList) => {
  const previousRef = React.useRef<T>();
  React.useEffect(() => {
    previousRef.current = value;
  }, deps);
  return previousRef.current;
}