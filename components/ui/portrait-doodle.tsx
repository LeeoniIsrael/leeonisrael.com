"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Eraser, Glasses, Pencil, RotateCcw, Undo2, X } from "lucide-react";

type Point = { x: number; y: number };
type Stroke = {
  points: Point[];
  color: string;
  erase: boolean;
};
type Bounds = { x: number; y: number; width: number; height: number };
const colors = [
  { name: "Graphite", value: "#232725" },
  { name: "Blue", value: "#2943a3" },
  { name: "Chalk", value: "#ffffff" },
];

function paint(context: CanvasRenderingContext2D, stroke: Stroke) {
  context.save();
  context.globalCompositeOperation = stroke.erase
    ? "destination-out"
    : "source-over";
  context.strokeStyle = stroke.color;
  context.fillStyle = stroke.color;
  context.lineWidth = stroke.erase ? 42 : 7;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  if (stroke.points.length === 1) {
    const point = stroke.points[0];
    context.arc(point.x, point.y, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();
  } else {
    stroke.points.forEach((point, index) => {
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    context.stroke();
  }
  context.restore();
}

export function PortraitDoodle({
  children,
  hero = false,
}: {
  children?: ReactNode;
  hero?: boolean;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState<Bounds | null>(null);
  return (
    <div
      className={`portrait-invitation ${hero ? "hero-portrait-invitation" : ""}`}
    >
      <button
        ref={trigger}
        className={
          hero
            ? "portrait-trigger hero-portrait-trigger"
            : "about-portrait portrait-trigger"
        }
        style={{ opacity: origin ? 0 : 1 }}
        aria-label="Draw on my portrait"
        aria-haspopup="dialog"
        onClick={() => {
          const rect = trigger.current!.getBoundingClientRect();
          setOrigin({
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          });
        }}
      >
        {children ?? (
          <Image
            src="/images/leeon-israel.webp"
            alt="Leeon Israel"
            width={1400}
            height={1400}
            sizes="(max-width:700px) 70vw, 280px"
          />
        )}
        {!hero && (
          <span className="portrait-hover">
            <Pencil size={18} /> Make your mark
          </span>
        )}
      </button>
      <button
        className="portrait-note"
        onClick={() => trigger.current?.click()}
        tabIndex={-1}
        aria-hidden="true"
      >
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
          <path
            d="M45 27C25 29 15 18 8 5M7 15L8 5L18 8"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>click me</span>
      </button>
      {origin &&
        createPortal(
          <DrawingPortrait
            origin={origin}
            getOrigin={() => {
              const rect = trigger.current!.getBoundingClientRect();
              return {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height,
              };
            }}
            onDismiss={() => {
              setOrigin(null);
              trigger.current?.focus({ preventScroll: true });
            }}
          />,
          document.body,
        )}
    </div>
  );
}

function DrawingPortrait({
  origin,
  getOrigin,
  onDismiss,
}: {
  origin: Bounds;
  getOrigin: () => Bounds;
  onDismiss: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const lensId = useId();
  const canvas = useRef<HTMLCanvasElement>(null);
  const active = useRef<Stroke | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [glasses, setGlasses] = useState(false);
  const [color, setColor] = useState(colors[0].value);
  const [erase, setErase] = useState(false);
  const [closing, setClosing] = useState(false);
  const [ready, setReady] = useState(false);
  const [target, setTarget] = useState(origin);
  const [returnTo, setReturnTo] = useState(origin);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = dialog.current!;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    const resize = () => {
      const landscape = innerWidth > innerHeight && innerHeight < 560;
      const width = landscape
        ? Math.min(360, (innerHeight - 120) * 0.8, (innerWidth - 240) * 0.6)
        : Math.min(420, innerWidth - 40, (innerHeight - 210) * 0.8);
      const height = width * 1.25;
      setTarget({
        x: (innerWidth - width - (landscape ? 210 : 0)) / 2,
        y: landscape
          ? (innerHeight - height) / 2 + 12
          : (innerHeight - height - 80) / 2 + 16,
        width,
        height,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      element.close();
      document.body.style.overflow = before;
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, 1000, 1250);
    strokes.forEach((stroke) => paint(context, stroke));
  }, [strokes]);
  function close() {
    if (closing) return;
    active.current = null;
    setStrokes([]);
    setGlasses(false);
    setReturnTo(getOrigin());
    setClosing(true);
  }
  function point(event: PointerEvent<HTMLCanvasElement>): Point {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 1000,
      y: ((event.clientY - rect.top) / rect.height) * 1250,
    };
  }
  function finish() {
    if (!active.current) return;
    const stroke = active.current;
    active.current = null;
    setStrokes((previous) => [...previous, stroke]);
  }
  return (
    <dialog
      ref={dialog}
      className="portrait-dialog"
      aria-labelledby="portrait-title"
      aria-describedby="portrait-description"
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <motion.div
        className="portrait-backdrop"
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{
          opacity: closing ? 0 : 1,
          backdropFilter: closing ? "blur(0px)" : "blur(16px)",
        }}
        transition={{ duration: reduced ? 0 : 0.28 }}
        onClick={close}
      />
      <motion.div
        className="portrait-studio"
        initial={reduced ? false : origin}
        animate={closing ? returnTo : target}
        transition={{
          duration: reduced ? 0 : closing ? 0.28 : 0.48,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => {
          if (closing) {
            dialog.current?.close();
            onDismiss();
          } else setReady(true);
        }}
      >
        <motion.div
          className="portrait-studio-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: closing ? 0 : 1 }}
          transition={{ duration: 0.18, delay: closing ? 0 : 0.18 }}
        >
          <div>
            <h2 id="portrait-title">Make your mark.</h2>
            <p id="portrait-description">A little less serious. Draw on me.</p>
          </div>
          <button
            className="portrait-tool"
            aria-label="Close portrait"
            onClick={close}
            autoFocus
          >
            <X size={20} />
          </button>
        </motion.div>
        <div className="portrait-paper">
          <Image
            src="/images/leeon-israel.webp"
            alt="Leeon Israel, ready for your doodle"
            fill
            sizes="420px"
            priority
            draggable={false}
          />
          <canvas
            ref={canvas}
            width={1000}
            height={1250}
            aria-label="Drawing surface. Use a mouse or touch to draw. Add glasses using the button below."
            className={erase ? "is-erasing" : ""}
            style={{ pointerEvents: ready && !closing ? "auto" : "none" }}
            onPointerDown={(event) => {
              if (event.button !== 0 || active.current) return;
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              active.current = { points: [point(event)], color, erase };
              const context = canvas.current!.getContext("2d")!;
              paint(context, active.current);
            }}
            onPointerMove={(event) => {
              if (!active.current) return;
              active.current.points.push(point(event));
              const context = canvas.current!.getContext("2d")!;
              paint(context, {
                ...active.current,
                points: active.current.points.slice(-2),
              });
            }}
            onPointerUp={finish}
            onPointerCancel={finish}
            onLostPointerCapture={finish}
          />
          {glasses && (
            <motion.svg
              className="portrait-glasses-overlay"
              viewBox="0 0 1000 1250"
              aria-hidden="true"
              initial={{ opacity: reduced ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              fill="none"
              stroke="#151719"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient id={lensId} x1="0" y1="0" x2=".25" y2="1">
                  <stop offset="0" stopColor="#101719" />
                  <stop offset=".55" stopColor="#33454a" />
                  <stop offset="1" stopColor="#12191c" />
                </linearGradient>
              </defs>
              {/* Angled wayfarer lenses follow the eyes in the fixed 4:5 crop. */}
              <path
                d="M306 397Q374 379 440 389Q449 391 449 407L444 450Q438 479 418 486Q379 500 341 487Q318 479 313 450Z"
                fill={`url(#${lensId})`}
              />
              <path
                d="M479 389Q541 369 610 382Q621 385 620 402L611 448Q607 471 583 479Q544 491 506 479Q487 474 482 449Z"
                fill={`url(#${lensId})`}
              />
              <path d="M449 410Q463 399 480 406M307 405L284 399M619 395L640 387" />
              <path
                d="M325 412L370 401M501 402L546 390"
                stroke="#dde9e9"
                strokeWidth="3"
                opacity=".22"
              />
              <path
                d="M307 406L317 404M607 397L617 395"
                stroke="#b2b7b7"
                strokeWidth="3"
              />
            </motion.svg>
          )}
        </div>
        <motion.div
          className="portrait-controls"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: closing ? 0 : 1, y: 0 }}
          transition={{ duration: 0.2, delay: closing ? 0 : 0.22 }}
        >
          <div
            className="portrait-tools"
            role="group"
            aria-label="Drawing tools"
          >
            {colors.map((ink) => (
              <button
                key={ink.name}
                className="portrait-swatch"
                style={{ "--ink": ink.value } as React.CSSProperties}
                aria-label={`${ink.name} pen`}
                aria-pressed={!erase && color === ink.value}
                onClick={() => {
                  setColor(ink.value);
                  setErase(false);
                }}
              >
                <span />
              </button>
            ))}
            <span className="portrait-tool-divider" />
            <button
              className="portrait-tool"
              aria-label="Eraser"
              aria-pressed={erase}
              onClick={() => setErase(!erase)}
            >
              <Eraser size={18} />
            </button>
            <button
              className="portrait-tool"
              aria-label="Undo drawing"
              disabled={!strokes.length}
              onClick={() => setStrokes((previous) => previous.slice(0, -1))}
            >
              <Undo2 size={18} />
            </button>
            <button
              className="portrait-tool"
              aria-label="Clear drawing"
              disabled={!strokes.length}
              onClick={() => setStrokes([])}
            >
              <RotateCcw size={17} />
            </button>
          </div>
          <button
            className="portrait-glasses"
            disabled={glasses}
            aria-pressed={glasses}
            onClick={() => setGlasses(true)}
          >
            <Glasses size={22} aria-hidden="true" />
            {glasses ? "Glasses on" : "Glasses"}
          </button>
          <p className="portrait-reset-note" role="status">
            {strokes.length || glasses
              ? "Just for now. Closing clears the canvas."
              : "Your canvas. Nothing gets saved."}
          </p>
        </motion.div>
      </motion.div>
    </dialog>
  );
}
