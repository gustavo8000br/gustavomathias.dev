type SectionHeadingProps = {
  id: string;
  index: string;
  label: string;
  title: string;
};

export function SectionHeading({
  id,
  index,
  label,
  title,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="section-marker">
        <span className="section-marker-number" aria-hidden="true">
          {index}
        </span>

        <span className="section-marker-label">{label}</span>
      </p>

      <h2 id={id}>{title}</h2>
    </div>
  );
}
