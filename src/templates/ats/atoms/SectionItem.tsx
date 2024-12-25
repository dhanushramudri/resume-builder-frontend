export const SectionItem = ({
  label,
  subtitle,
  dateRange,
  description,
}: {
  label: string;
  subtitle: string;
  dateRange?: string; // Optional
  description?: string | JSX.Element; // Allow string or JSX
}) => (
  <div className="mb-2">
    <p className="text-md font-medium">{label}</p>
    <p className="text-sm text-gray-600">{subtitle}</p>
    {dateRange && <p className="text-xs text-gray-500">{dateRange}</p>}
    {description && (
      <div className="mt-1 text-sm">
        {typeof description === 'string' ? (
          description
        ) : (
          <p>{JSON.stringify(description)}</p> // Fallback for unexpected object descriptions
        )}
      </div>
    )}
  </div>
);
