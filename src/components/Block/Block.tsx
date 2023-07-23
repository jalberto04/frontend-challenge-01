import classNames from "classnames";
import { IconO, IconX } from "../Icons/Icons";

type BlockProps = {
  onClickBlock: (index: number) => void;
  index: number;
  value: string;
  isHighlighted: boolean;
  hasGameStarted: boolean;
};

export default function Block({
  onClickBlock,
  index,
  value,
  isHighlighted,
  hasGameStarted,
}: BlockProps) {
  return (
    <div
      onClick={() => {
        if (!value) {
          onClickBlock(index);
        }
      }}
      className={classNames(
        "cursor-pointer  h-20 w-20 border-2 text-black grid place-items-center",
        {
          ["hover:bg-neutral-200"]: !value && hasGameStarted,
          ["bg-green-200"]: isHighlighted,
          ["bg-neutral-100"]: !isHighlighted,
          ["border-green-700"]: hasGameStarted,
          ["border-gray-300"]: !hasGameStarted,
        }
      )}
    >
      {value === "X" ? <IconX /> : value === "O" ? <IconO /> : null}
    </div>
  );
}
