interface ResumeTitleProps {
  title: string;
  className?: string;
}

export const ResumeTitle = ({ title, className }: ResumeTitleProps) => {
  return <h1 className={className}>{title}</h1>;
};
