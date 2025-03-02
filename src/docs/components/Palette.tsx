import { FC } from "react";

type PaletteProps = {
  colorName: string;
};

export const Palette: FC<PaletteProps> = ({ colorName }) => {
  const variants = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return (
    <div className="flex">
      {variants.map((variant, i) => (
        <div
          key={i}
          className="flex-1 h-24"
          style={{
            backgroundColor: `var(--bl-clr-${colorName}-${variant})`,
          }}
        ></div>
      ))}
    </div>
  );
};
