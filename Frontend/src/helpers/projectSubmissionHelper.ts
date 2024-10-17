import { ProjectProps } from '../components/Types';

export const validateTitle = (title: string, titleIsTouched: boolean, titleIsDirty: boolean) => {
    return title.trim().length > 2 && titleIsTouched && titleIsDirty; 
};

export const validateDescription = (description: string) => {
    const wordCount = description.trim().split(/\s+/).length;
    return wordCount >= 2; 
};


export const updateField = (
    event: React.FormEvent<HTMLInputElement>,
    field: string,
    setState: (value: string) => void,
    setStateValid?: (value: boolean) => void,
    validateFn?: (value: string) => boolean
  ) => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
  
    setState(input.value);
  
    if (validateFn && setStateValid) {
      setStateValid(validateFn(input.value));
    }
  };


export const generateNewProject = (published: boolean, title: string, description: string, technologies: string[], link: string, dateMade: string, mediaId: string): ProjectProps => {
return {
    id: crypto.randomUUID(),
    published,
    title,
    description,
    technologies,
    link,
    dateMade,
    mediaId
};
};
