type ToolbarProps = {
  title: string;
  onSelect: () => void;
};

export const Toolbar = ({ onSelect, title }: ToolbarProps) => {
  return (
    <div
      onClick={onSelect}
      className="flex items-center justify-center transition-all border cursor-pointer w-14 h-14 border-primary hover:bg-neutral-900"
    >
      {title}
    </div>
  );
};
