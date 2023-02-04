import { Link } from "@/shared/ui/link";
import { Status } from "@/shared/ui/status";

type CardProps = {
  title: string;
};

export function Card({ title }: CardProps) {
  return (
    <div className="flex justify-between p-2 duration-100 cursor-pointer hover:bg-neutral-600">
      {/* Game name */}
      <div className="w-fit">
        <Link href="https://youtube.com">{title}</Link>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-2">
        <Status type="success" />
        <span>5 / 10</span>
      </div>
    </div>
  );
}
