import classNames from "classnames";
import { FC, ReactNode } from "react";
import { Button } from "./button";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;

  title?: string;
  withControls?: boolean;
};

export const Modal: FC<ModalProps> = ({
  children,
  open,
  setOpen,
  title,
  withControls,
}) => {
  return (
    // Overlay
    <div
      className={classNames(
        "duration-200 flex fixed inset-0 z-50 items-center justify-center bg-half-black",
        {
          "opacity-100": open,
          "opacity-0 pointer-events-none": !open,
        }
      )}
    >
      <div
        className={classNames(
          "duration-200 p-2 border min-w-[350px] flex gap-2 flex-col",
          {
            "scale-100": open,
            "scale-0": !open,
          }
        )}
      >
        {/* Header */}
        {title && (
          <div>
            <h2>{title}</h2>
          </div>
        )}
        {/* Content */}
        <div>{children}</div>
        {/* Footer */}
        {withControls && (
          <div className="self-end gap-2">
            <Button onClick={setOpen.bind(null, false)}>Close</Button>
          </div>
        )}
      </div>
    </div>
  );
};
