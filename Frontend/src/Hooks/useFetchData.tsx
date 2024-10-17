import { useCallback, useState, useEffect } from 'react';
import { fetchProjects, fetchStudentData, fetchMedia } from '../Services/api';
import { ProjectProps, studentProp, MediaProps } from '../components/Types';

export function useFetchData() {
  const [projectData, setProjectData] = useState<ProjectProps[]>([]);
  const [studentData, setStudentData] = useState<studentProp | null>(null);
  const [mediaData, setMediaData] = useState<MediaProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [projects, student, media] = await Promise.all([
        fetchProjects(),
        fetchStudentData(),
        fetchMedia(),
      ]);
      setProjectData(projects);
      setStudentData(student);
      setMediaData(media)
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { projectData, setProjectData, studentData, mediaData, setMediaData, loading, error, fetchData };
};

export default useFetchData;