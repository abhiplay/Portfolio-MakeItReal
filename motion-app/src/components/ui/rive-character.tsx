import { useEffect, useRef, type PointerEvent } from "react";
import {
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceNumber,
} from "@rive-app/react-canvas";

/* ---------------- Rive character ----------------
   A rigged character from /public/rive/character.riv. It sways on its own
   (the idle loop) and tilts its head toward the cursor. The cursor's horizontal
   position in the box sets the view-model number `look` (0 to 100), which the
   file's blend state reads: 0 tilts left, 50 is idle, 100 tilts right.
   Loaded lazily from lab.tsx, so the Rive runtime is not in the main bundle. */

const LOOK_CENTRE = 50;

export default function RiveCharacter({ className }: { className?: string }) {
  const { rive, RiveComponent } = useRive({
    src: "/rive/character.riv",
    artboard: "Artboard",
    stateMachines: "Character",
    autoplay: true,
  });

  const viewModel = useViewModel(rive, { useDefault: true });
  const instance = useViewModelInstance(viewModel, { rive, useDefault: true });
  const { setValue: setLook } = useViewModelInstanceNumber("look", instance);

  const boxRef = useRef<HTMLDivElement>(null);

  // Reduced motion: hold the first frame instead of looping.
  useEffect(() => {
    if (!rive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) rive.pause();
  }, [rive]);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setLook(Math.min(100, Math.max(0, ratio * 100)));
  }

  return (
    <div
      ref={boxRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setLook(LOOK_CENTRE)}
      className={className}
    >
      <RiveComponent className="h-full w-full" />
    </div>
  );
}
