import React from "react";

const useTimestamp = (dep?: React.DependencyList) => {
  React.useEffect(() => {
    console.log(`rendered at ${Date.now()}`);
    return () => {
      console.log(`cleaned up at ${Date.now()}`);
    }
  }, dep)
}

export default useTimestamp;