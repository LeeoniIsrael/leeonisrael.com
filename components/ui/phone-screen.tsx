import Image from "next/image";
import type { ProjectScreen } from "@/lib/project-screens";

/** One device shell for showcases, project previews, and the screen viewer. */
export function PhoneScreen({
  screen,
  title,
  sizes = "(max-width:700px) 31vw, 210px",
}: {
  screen: ProjectScreen;
  title: string;
  sizes?: string;
}) {
  const appearance = screen.src.includes("/signify-") ? "light" : "dark";
  const background = screen.src.includes("/onhand-") ? "onhand" : appearance;
  return (
    <span className={`iphone-device iphone-device-${background}`}>
      <span className="iphone-display">
        <Image
          className={
            screen.src.includes("/onhand-")
              ? "iphone-content-without-status"
              : undefined
          }
          src={screen.src}
          alt={`${title} ${screen.name.toLowerCase()} screen`}
          width={screen.width}
          height={screen.height}
          sizes={sizes}
        />
        <span
          className={`iphone-status iphone-status-${appearance}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 390 64" fill="currentColor">
            <text
              x="42"
              y="36"
              fontSize="16"
              fontWeight="600"
              fontFamily="Arial, sans-serif"
            >
              9:41
            </text>
            <g transform="translate(290 24)">
              <rect x="0" y="9" width="3" height="4" rx="1" />
              <rect x="5" y="6" width="3" height="7" rx="1" />
              <rect x="10" y="3" width="3" height="10" rx="1" />
              <rect x="15" width="3" height="13" rx="1" />
              <path d="M25 3q8-7 16 0l-2 2q-6-5-12 0zM28 7q5-5 10 0l-2 2q-3-3-6 0zM31 11q2-2 4 0l-2 2z" />
              <rect
                x="48"
                y="1"
                width="23"
                height="12"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <rect x="50" y="3" width="19" height="8" rx="1.5" />
              <rect x="73" y="5" width="2" height="4" rx="1" opacity=".5" />
            </g>
          </svg>
        </span>
        <span className="iphone-island" aria-hidden="true">
          <span />
        </span>
        <span
          className={`iphone-home iphone-status-${appearance}`}
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
