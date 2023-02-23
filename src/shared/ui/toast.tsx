import classNames from "classnames";

type ToastProps = {
  status: "info" | "success";
  text: string;
};

export const Toast = ({ status, text }: ToastProps) => {
  return (
    <div className="fixed flex justify-center w-full top-2">
      <div
        className={classNames("px-3 py-1 rounded-full w-fit", {
          "bg-orange-500": status === "info",
          "bg-green-500": status === "success",
        })}
      >
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
};
