import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

export const ReactLoader = ({ color, loading }: any) => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <ClipLoader
      color={color}
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
