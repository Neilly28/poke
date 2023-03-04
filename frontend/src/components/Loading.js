import React from "react";
import { useState, useEffect } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  });
  return <div></div>;
};

export default Loading;
