import { useEffect } from 'react';
import '../../../App.css';
import Projects from '../../../components/Projects';
import StudentHeader from '../../../components/StudentHeader';
import Experiences from '../../../components/Experiences';
import ContactForm from '../../../components/ContactForm';
import SubmitProject from '../../../components/SubmitProject';
import useFetchData from '../../../Hooks/useFetchData';
import ProjectsPerTechnology from '../../../components/ProjectsPerTechnology';



export default function PortifolioPage() {
const { projectData, setProjectData, studentData, mediaData, setMediaData, loading, error, fetchData } = useFetchData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!studentData) {
    return <p>No student data available.</p>;
  }



return (
 
<>
      <StudentHeader 
        student={studentData.name} 
        degree={studentData.degree} 
        points={studentData.points} 
        email={studentData.email} 
      />
      <Experiences experiences={studentData.experiences} />
      <Projects projects={projectData} mediaData={mediaData}/>
      <ProjectsPerTechnology projects={projectData}/>
      <SubmitProject setProjectData={setProjectData} setMediaData={setMediaData}/>
      <ContactForm /> 
    </>
  );
}
