import Image from "next/image";
import { accentClasses } from "@/lib/helpers";

type Props = {
  src: string;
  alt: string;
  accent: string;
};

export function ImageHero({ src, alt, accent }: Props) {
  const a = accentClasses(accent);
  return (
    <figure
      className={`relative mt-6 overflow-hidden rounded-2xl border border-zinc-200 ${a.soft}`}
    >
      <div className="relative aspect-[16/9] w-full sm:aspect-[3/2]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 768px) 720px, 100vw"
          className="object-cover"
        />
      </div>
    </figure>
  );
}
