import { useTemplates } from '@/stores/useTemplate';
import { useZoom } from '@/stores/useZoom';
import ResumeController from '../atoms/ResumeController';
import { ResumeTitle } from '../atoms/ResumeTitle';

const ResumeHeader = () => {
  const { zoomIn, zoomOut, resetZoom } = useZoom.getState();
  const templateName = useTemplates((state) => state.activeTemplate.name);

  return (
    <div className="flex flex-row sm:flex-row items-center mt-16 justify-between gap-4 px-4 py-3 sm:py-4">
      <ResumeTitle
        title={templateName}
        className="text-sm sm:text-xl font-semibold truncate max-w-[200px] sm:max-w-none"
      />
      <ResumeController
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        resetZoom={resetZoom}
        className="flex items-center space-x-2 sm:space-x-4"
      />
    </div>
  );
};

export default ResumeHeader;
