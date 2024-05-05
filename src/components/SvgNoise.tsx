import { useGradientStore } from "../store"

export default function SvgNoise() {
  const { noiseOn } = useGradientStore()

  return noiseOn ? (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1,
        width: "100vw",
        height: "100vh",
        opacity: 0.5,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="10"
            numOctaves="1"
            result="turbulence"
          />
          <feColorMatrix type="saturate" values="1" />
          <feBlend mode="multiply" in="SourceGraphic" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#noise)"
          fill="transparent"
        />
      </svg>
    </div>
  ) : null
}
