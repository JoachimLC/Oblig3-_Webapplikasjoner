const baseUrl = "http://localhost:3000";
const endpointsV1 = {
  projects: `${baseUrl}/projects`,
  student: `${baseUrl}/student`,
  media: `${baseUrl}/media`,
};

export { baseUrl, endpointsV1 as endpoints };