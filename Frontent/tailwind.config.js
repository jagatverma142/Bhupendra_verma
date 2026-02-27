export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { keyframes: {
    shimmer: { "0%": { transform: "translateX(-120%)" }, "100%": { transform: "translateX(220%)" } },
    floaty: { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
    gradientShift: { "0%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" }, "100%": { backgroundPosition: "0% 50%" } },
    pulseGlow: { "0%,100%": { opacity: "0.35" }, "50%": { opacity: "0.7" } },
    wiggle: { "0%": { transform: "rotate(-1deg)" }, "50%": { transform: "rotate(1deg)" }, "100%": { transform: "rotate(-1deg)" } },
    marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
  },
  animation: {
    shimmer: "shimmer 1.6s ease-in-out infinite",
    floaty: "floaty 6s ease-in-out infinite",
    gradientShift: "gradientShift 8s ease-in-out infinite",
    pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
    wiggle: "wiggle 2.5s ease-in-out infinite",
    marquee: "marquee 18s linear infinite",
  },
},
  },
  plugins: [],
}
