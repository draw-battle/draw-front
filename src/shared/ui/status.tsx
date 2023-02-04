import classnames from "classnames";

type StatusProps = {
  type: "success" | "warning" | "error";
};

export const Status = ({ type }: StatusProps) => {
  return (
    <div
      className={classnames("w-4 h-4 rounded-full", {
        "bg-green-400": type === "success",
        "bg-orange-400": type === "warning",
        "bg-red-400": type === "error",
      })}
    ></div>
  );
};
