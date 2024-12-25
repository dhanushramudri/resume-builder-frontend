import { Context, createContext, useEffect, useState } from 'react';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import { ThemeProvider } from '@mui/material/styles';
import { useResumeStore } from '@/stores/useResumeStore';
import { useTemplates } from '@/stores/useTemplate';
import { useThemes } from '@/stores/themes';
import { useZoom } from '@/stores/useZoom';

export let StateContext: Context<any> = createContext(null);

export const ResumeLayout = () => {
  const resumeData = useResumeStore();
  const zoom = useZoom((state) => state.zoom);
  const setInitialZoom = useZoom((state) => state.setInitialZoom);
  const templateId = useTemplates((state) => state.activeTemplate.id);
  const Template = AVAILABLE_TEMPLATES[templateId]?.component;
  const selectedTheme = useThemes((state) => state.selectedTheme);
  StateContext = createContext(resumeData);

  useEffect(() => {
    setInitialZoom();
    const selectedTemplateId =
      localStorage.getItem('selectedTemplateId') || AVAILABLE_TEMPLATES['modern'].id;
    useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES[selectedTemplateId]);
  }, []);

  return (
    <div className="relative w-full overflow-x-auto overflow-y-auto">
      <div className="flex justify-center px-2 sm:px-4 md:px-6 py-2 sm:py-4">
        <div className="w-[210mm]  ">
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
            }}
            className=" transition-all duration-300 ease-linear print:!scale-100"
          >
            <div className="bg-white shadow-md print:shadow-none min-h-[296mm] w-[210mm] overflow-hidden">
              <div className="w-full resume-container print:overflow-visible">
                <StateContext.Provider value={resumeData}>
                  <ThemeProvider theme={selectedTheme}>
                    {Template && (
                      <div className="print:avoid-breaks">
                        <Template />
                      </div>
                    )}
                  </ThemeProvider>
                </StateContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
