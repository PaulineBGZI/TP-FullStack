export default function Floaties({ items = [], extra = [] }) {
    return (
        <div className="floaties" aria-hidden="true">
            {items.map((emoji, idx) => (
                <span key={`i-${idx}`} className={`floaty f${idx + 1}`}>
          {emoji}
        </span>
            ))}

            {extra.map((it, idx) => (
                <span key={`e-${idx}`} className={`floaty ${it.className}`}>
          {it.emoji}
        </span>
            ))}
        </div>
    );
}
