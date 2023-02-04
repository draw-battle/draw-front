type CardProps = {
  title: string;
};

export function Card({ title }: CardProps) {
  return (
    <div className="p-1">
      <div>
        <h1 className="text-xl">{title}</h1>
      </div>
    </div>
  );
}
