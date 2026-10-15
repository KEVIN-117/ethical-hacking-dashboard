import { Effects } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Particles } from "./particles";
import { VignetteShader } from "./shaders/vignetteShader";

export const GL = ({ hovering }: { hovering: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.05 });
  const hasEnteredView = useInView(containerRef, { amount: 0.05, once: true });
  const reducedMotion = useReducedMotion();
  const {
    speed,
    focus,
    aperture,
    size,
    noiseScale,
    noiseIntensity,
    timeScale,
    pointSize,
    opacity,
    planeScale,
    vignetteDarkness,
    vignetteOffset,
    useManualTime,
    manualTime,
  } = useControls("Particle System", {
    speed: { value: 0.45, min: 0, max: 2, step: 0.01 },
    noiseScale: { value: 0.6, min: 0.1, max: 5, step: 0.1 },
    noiseIntensity: { value: 0.38, min: 0, max: 2, step: 0.01 },
    timeScale: { value: 0.7, min: 0, max: 2, step: 0.01 },
    focus: { value: 3.8, min: 0.1, max: 20, step: 0.1 },
    aperture: { value: 1.79, min: 0, max: 2, step: 0.01 },
    pointSize: { value: 6.0, min: 0.1, max: 10, step: 0.1 },
    opacity: { value: 0.42, min: 0, max: 1, step: 0.01 },
    planeScale: { value: 8.0, min: 0.1, max: 10, step: 0.1 },
    size: {
      value: 256,
      options: [128, 256, 512],
    },
    showDebugPlane: { value: false },
    vignetteDarkness: { value: 1.3, min: 0, max: 2, step: 0.1 },
    vignetteOffset: { value: 0.5, min: 0, max: 2, step: 0.1 },
    useManualTime: { value: false },
    manualTime: { value: 0, min: 0, max: 50, step: 0.01 },
  });
  return (
    <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {!reducedMotion && hasEnteredView && (
        <Canvas
          frameloop={inView ? "always" : "never"}
          dpr={[1, 1.25]}
          gl={{ antialias: false, powerPreference: "low-power" }}
          camera={{
            position: [
              1.2629783123314589, 2.664606471394044, -1.8178993743288914,
            ],
            fov: 50,
            near: 0.01,
            far: 300,
          }}
        >
          <color attach="background" args={["#02050c"]} />
          <Particles
            speed={speed}
            aperture={aperture}
            focus={focus}
            size={size}
            noiseScale={noiseScale}
            noiseIntensity={noiseIntensity}
            timeScale={timeScale}
            pointSize={pointSize}
            opacity={opacity}
            planeScale={planeScale}
            useManualTime={useManualTime}
            manualTime={manualTime}
            introspect={hovering}
          />
          <Effects multisamping={0} disableGamma>
            <shaderPass
              args={[VignetteShader]}
              uniforms-darkness-value={vignetteDarkness}
              uniforms-offset-value={vignetteOffset}
            />
          </Effects>
        </Canvas>
      )}
    </div>
  );
};
