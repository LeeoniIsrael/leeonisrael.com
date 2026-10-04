"use client";

// Deliberately irregular city blocks, behind the waterfront landmarks.
const rear = [
  [70, 48, 55],
  [158, 43, 82],
  [240, 54, 63],
  [352, 38, 90],
  [445, 66, 60],
  [562, 47, 100],
  [645, 70, 84],
  [753, 40, 67],
  [855, 62, 107],
  [961, 44, 135],
  [1055, 68, 90],
  [1170, 52, 128],
  [1271, 58, 98],
  [1380, 42, 152],
  [1470, 76, 125],
  [1578, 42, 180],
  [1670, 58, 152],
  [1760, 48, 198],
  [1855, 70, 154],
  [1958, 38, 120],
  [2050, 62, 194],
  [2150, 48, 226],
  [2243, 53, 153],
  [2338, 74, 197],
  [2448, 48, 170],
  [2540, 68, 213],
  [2650, 50, 184],
  [2740, 64, 244],
  [2835, 44, 162],
  [2940, 62, 204],
  [3048, 80, 172],
  [3165, 60, 125],
  [3270, 50, 144],
  [3360, 64, 108],
  [3475, 58, 130],
  [3580, 72, 106],
  [3690, 49, 97],
  [3785, 68, 121],
  [3910, 58, 91],
  [4030, 72, 75],
  [4155, 48, 103],
  [4250, 64, 69],
  [4365, 55, 90],
  [4470, 67, 61],
  [4585, 48, 85],
  [4670, 70, 63],
  [4770, 54, 52],
];
const front = [
  [0, 85, 38],
  [110, 58, 45],
  [198, 72, 37],
  [300, 86, 55],
  [424, 69, 44],
  [540, 78, 52],
  [661, 61, 40],
  [770, 81, 68],
  [900, 75, 52],
  [1030, 80, 71],
  [1160, 73, 48],
  [1280, 58, 74],
  [1380, 82, 95],
  [1510, 61, 76],
  [1620, 74, 107],
  [1750, 75, 81],
  [1870, 90, 98],
  [2020, 77, 72],
  [2140, 70, 100],
  [2260, 87, 87],
  [2390, 73, 113],
  [2510, 95, 89],
  [2660, 67, 110],
  [2780, 90, 92],
  [2920, 71, 101],
  [3040, 82, 80],
  [3170, 76, 64],
  [3290, 87, 76],
  [3420, 73, 59],
  [3540, 82, 74],
  [3670, 69, 52],
  [3780, 85, 61],
  [3910, 72, 42],
  [4030, 90, 58],
  [4170, 73, 39],
  [4290, 78, 57],
  [4420, 71, 41],
  [4540, 87, 52],
  [4670, 75, 40],
  [4790, 70, 46],
];
function Block({
  x,
  width,
  height,
  index,
}: {
  x: number;
  width: number;
  height: number;
  index: number;
}) {
  const y = 385 - height;
  const inset = index % 3 === 0 ? 9 : 5;
  return (
    <g>
      <path
        d={`M${x} 385V${y + 9}H${x + inset}V${y}H${x + width - inset}V${y + 9}H${x + width}V385Z`}
        fill="var(--footer-background)"
      />
      <path
        d={`M${x + width - 10} ${y + 10}V385M${x} ${y + 18}H${x + width}`}
        opacity=".6"
      />
      {Array.from({ length: Math.floor((height - 26) / 9) }, (_, row) => (
        <path
          key={row}
          d={`M${x + 6} ${y + 26 + row * 9}H${x + width - 16}`}
          strokeWidth=".75"
          opacity=".6"
        />
      ))}
      {Array.from({ length: Math.floor((width - 22) / 9) }, (_, col) => (
        <path
          key={col}
          d={`M${x + 12 + col * 9} ${y + 20}V383`}
          strokeWidth=".7"
          opacity=".45"
        />
      ))}
    </g>
  );
}
export function ManhattanLinework({ id }: { id: string }) {
  return (
    <g
      stroke="currentColor"
      fill="none"
      strokeWidth="1.3"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <defs>
        <pattern
          id={`${id}-glass`}
          width="4"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M1 0V6M0 5H4"
            stroke="currentColor"
            strokeWidth=".7"
            opacity=".65"
          />
        </pattern>
        <clipPath id={`${id}-wtc`}>
          <path d="M2084 101L2110 94L2136 101L2149 328V385H2071V328Z" />
        </clipPath>
        <clipPath id={`${id}-four`}>
          <path d="M2205 196L2265 187V385H2205Z" />
        </clipPath>
        <clipPath id={`${id}-three`}>
          <path d="M2301 170H2370V385H2301Z" />
        </clipPath>
      </defs>
      <g opacity=".26">
        {rear.map(([x, width, height], index) => (
          <Block key={x} x={x} width={width} height={height} index={index} />
        ))}
      </g>
      <g opacity=".65">
        {/* Brookfield Place's domed crowns and stepped waterfront towers. */}
        {[
          { x: 1650, top: 183, width: 78 },
          { x: 1810, top: 220, width: 68 },
        ].map(({ x, top, width }) => (
          <g key={x}>
            <path
              d={`M${x} 385V${top + 26}H${x + 4}Q${x + width / 2} ${top - 16} ${x + width - 4} ${top + 26}H${x + width}V385Z`}
              fill="var(--footer-background)"
            />
            <path
              d={`M${x + 4} ${top + 26}H${x + width - 4}M${x + width / 2} ${top - 4}V${top + 26}`}
            />
            {Array.from({ length: 9 }, (_, n) => (
              <path
                key={n}
                d={`M${x + 8 + n * 7} ${top + 28}V385`}
                opacity=".65"
                strokeWidth=".9"
              />
            ))}
            {Array.from({ length: Math.floor((359 - top) / 10) }, (_, n) => (
              <path
                key={n}
                d={`M${x} ${top + 38 + n * 10}H${x + width}`}
                opacity=".5"
                strokeWidth=".75"
              />
            ))}
          </g>
        ))}
        {/* One World Trade Center: spire, rotated parapet, triangular glass facets, podium. */}
        <g>
          <path
            d="M2110 26V94M2108 54H2112M2107 71H2113M2105 88H2115"
            strokeWidth="1.25"
          />
          <path
            d="M2084 101L2110 94L2136 101L2149 328V385H2071V328Z"
            fill="var(--footer-background)"
            strokeWidth="1.6"
          />
          <rect
            x="2070"
            y="94"
            width="80"
            height="291"
            fill={`url(#${id}-glass)`}
            stroke="none"
            clipPath={`url(#${id}-wtc)`}
          />
          <path
            d="M2084 101L2149 328M2136 101L2071 328M2110 94V385M2071 328H2149M2098 97V90H2122V97"
            strokeWidth="1"
          />
        </g>
        {/* 4 WTC's sloped crown and 3 WTC's articulated structural grid. */}
        <path
          d="M2205 196L2265 187V385H2205Z"
          fill="var(--footer-background)"
        />
        <rect
          x="2205"
          y="187"
          width="60"
          height="200"
          fill={`url(#${id}-glass)`}
          stroke="none"
          clipPath={`url(#${id}-four)`}
        />
        <path
          d="M2301 170H2370V385H2301ZM2310 170V156H2362V170M2301 225H2370M2301 279H2370M2301 333H2370M2311 170V385M2360 170V385"
          fill="var(--footer-background)"
        />
        <rect
          x="2301"
          y="170"
          width="70"
          height="215"
          fill={`url(#${id}-glass)`}
          stroke="none"
          clipPath={`url(#${id}-three)`}
        />
        {/* Woolworth's layered Gothic crown in the Financial District. */}
        <path
          d="M2764 385V237H2772V210H2780V187L2795 161L2810 187V210H2818V237H2826V385Z"
          fill="var(--footer-background)"
        />
        <path d="M2795 145V161M2780 187H2810M2772 210H2818M2764 237H2826M2783 219V385M2795 191V385M2807 219V385" />
        <path
          d="M2900 385V213H2908V193H2916V175H2927V158H2957V175H2968V193H2976V213H2984V385Z"
          fill="var(--footer-background)"
        />
        {Array.from({ length: 7 }, (_, n) => (
          <path
            key={n}
            d={`M${2909 + n * 10} 215V385`}
            opacity=".6"
            strokeWidth=".8"
          />
        ))}
      </g>
      <g opacity=".8">
        {front.map(([x, width, height], index) => (
          <Block
            key={x}
            x={x}
            width={width}
            height={height}
            index={index + 1}
          />
        ))}
      </g>
      <g opacity=".65" strokeWidth=".8">
        {Array.from({ length: 96 }, (_, lot) => {
          const x = lot * 50;
          const top = 365 - ((lot * 13) % 27);
          return (
            <g key={lot}>
              <path
                d={`M${x} 385V${top}H${x + 47}V385Z M${x} ${top + 4}H${x + 47}`}
                fill="var(--footer-background)"
              />
              <path
                d={`M${x + 9} ${top + 11}V383M${x + 19} ${top + 11}V383M${x + 29} ${top + 11}V383M${x + 39} ${top + 11}V383M${x + 4} ${top + 18}H${x + 43}M${x + 4} ${top + 26}H${x + 43}`}
                opacity=".55"
              />
            </g>
          );
        })}
      </g>
      <g opacity=".6" strokeWidth="1">
        <path d="M0 388H4800M0 395H4800M0 402H4800" />
        {Array.from({ length: 105 }, (_, n) => (
          <path key={n} d={`M${n * 46} 389V399`} opacity=".5" />
        ))}
        <path
          d="M310 412H925M1120 412H1920M2240 412H2965M3200 412H4150M4600 412H4800M0 426H380M650 426H1425M1660 426H2175M2460 426H3450M3680 426H4510"
          opacity=".35"
        />
      </g>
    </g>
  );
}
