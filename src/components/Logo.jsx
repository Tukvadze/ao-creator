export default function Logo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Lightning bolt */}
      <path
        d="M26.5 8L16 26H23L19.5 40L32 22H25L26.5 8Z"
        fill="url(#lightning-gradient)"
        stroke="#0a84ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a84ff" />
          <stop offset="100%" stopColor="#3fa0ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
