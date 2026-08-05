/* ─── Logo ─── */
export default function OjasLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 40 40"
          className="w-8 h-8 text-brand-blue animate-[spin_40s_linear_infinite]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(20, 20)">
            {[0, 72, 144, 216, 288].map((angle) => (
              <path
                key={angle}
                transform={`rotate(${angle})`}
                d="M 0,-4.5 C 2.5,-4.5 5,-6 6,-10 C 7,-14 4.5,-17.5 0,-16.5 C -4.5,-15.5 -5,-11 -4.5,-7.5 C -4,-4 -2,-4 0,-4.5 Z"
                fill="currentColor"
              />
            ))}
          </g>
        </svg>
      </div>
      <span className="font-display font-extrabold text-xl tracking-wider select-none flex items-center text-brand-blue animate-pulse">
        OJ<span>Λ</span>S
      </span>
    </div>
  );
}
