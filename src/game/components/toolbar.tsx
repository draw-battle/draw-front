import classNames from "classnames";
import { ReactNode } from "react";

type ToolbarProps = {
  title: ReactNode;
  onSelect: () => void;
  active?: boolean;
};

export const Toolbar = ({ onSelect, title, active }: ToolbarProps) => {
  return (
    <div
      onClick={onSelect}
      className={`flex border-primary items-center justify-center transition-all border cursor-pointer w-14 h-14  ${classNames(
        {
          " hover:bg-neutral-900 hover:-translate-y-2": !active,
          "text-body bg-primary": active,
        }
      )}`}
    >
      {title}
    </div>
  );
};
