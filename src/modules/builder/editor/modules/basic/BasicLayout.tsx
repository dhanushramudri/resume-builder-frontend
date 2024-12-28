import React, { Fragment } from 'react';
import { useBasicDetails } from '@/stores/basic';
import { useResume } from '@/context/ResumeContext';
import BasicHeader from './components/BasicHeader';
import BasicPanel from './components/BasicPanel';

const tabTitles = ['Contacts', 'Links', 'About'];

const BasicLayout = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const { values, updateValues } = useBasicDetails();
  const { updateResumeData,resumeData } = useResume();

  const changeActiveTab = (event: React.SyntheticEvent, activeTab: number) => {
    setActiveTab(activeTab);
  };

  const handleBasicUpdate = (updatedTabs: any) => {
    // Update Zustand store
    updateValues(updatedTabs);
    
    // Update Resume Context
    updateResumeData('basics', updatedTabs);

    // Get existing data from localStorage
    const existingData = localStorage.getItem('userDetailsData');
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      console.log(parsedData);
      console.log("basic data");
      console.log(resumeData.basics)
      
      // Update only the basics section while preserving all other data
      const updatedData = {
        ...parsedData,
        resumeData: {
          ...parsedData.resumeData,
          basics: {
            ...resumeData.basics,
            ...updatedTabs
          }
        },
        updatedAt: new Date().toISOString()
      };

      // Save back to localStorage
      console.log(updatedData);
      localStorage.setItem('userDetailsData', JSON.stringify(updatedData));
    }
  };

  return (
    <Fragment>
      <BasicHeader
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
        tabTitles={tabTitles}
      ></BasicHeader>
      <BasicPanel
        activeTab={activeTab}
        basicTabs={values}
        onChangeText={handleBasicUpdate}
      ></BasicPanel>
    </Fragment>
  );
};

export default BasicLayout;
