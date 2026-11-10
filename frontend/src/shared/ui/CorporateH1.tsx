import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  line1: ReactNode;
  highlight: ReactNode;
  className?: string;
};

export default function CorporateH1({ line1, highlight, className }: Props) {
  return (
    <h1
      className={clsx(
        // Corporate H1 (structure/scale). Color should be provided by the parent context
        // to avoid forcing dark backgrounds across the site.
        "text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6",
        className,
      )}
    >
      {line1} <br /> <span className="text-primary-fixed">{highlight}</span>
    </h1>
  );
}
