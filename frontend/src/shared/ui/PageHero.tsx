import type { ReactNode } from "react";
import clsx from "clsx";
import CorporateH1 from "./CorporateH1";

type Props = {
  backgroundSrc: string;
  titleLine1: ReactNode;
  titleHighlight: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  heightClassName?: string;
  overlayClassName?: string;
  className?: string;
};

export default function PageHero({
  backgroundSrc,
  titleLine1,
  titleHighlight,
  subtitle,
  align = "center",
  heightClassName = "h-[260px] sm:h-[320px] lg:h-[400px]",
  overlayClassName = "bg-slate-950/45",
  className,
}: Props) {
  const contentClass =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={clsx("relative w-full overflow-hidden", heightClassName, className)}>
      <img
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover object-center"
        src={backgroundSrc}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        sizes="100vw"
      />
      <div className={clsx("absolute inset-0", overlayClassName)} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={clsx("max-w-7xl w-full px-6 flex flex-col", contentClass)}>
          <CorporateH1 className="text-white mb-4" line1={titleLine1} highlight={titleHighlight} />
          {subtitle ? <p className="text-base sm:text-xl text-white/90 max-w-2xl font-medium">{subtitle}</p> : null}
        </div>
      </div>
    </div>
  );
}

