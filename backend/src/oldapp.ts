import { Hono } from "hono";
import { cors } from "hono/cors";



const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);



app.get("/projects", (c) => {

  const projects = [
    {
      id: "d1d13d13d1d1",
      published: false,
      title: "Portfolio Website",
      description: "A personal portfolio website",
      technologies: ["React", "JavaScript", "CSS", "HTML"],
      link: "https://Joachim.com/portfolio",
      dateMade: "2024-10-07",
      mediaId: "m1",
    },
    {
      id: "d1d13d13d1d2",
      published: true,
      title: "Online store",
      description: "An online store platform built with Django.",
      technologies: ["Django", "Python", "HTML"],
      link: "https://onlinestore.com",
      dateMade: "2024-10-07",
      mediaId: "m2",
    },
    {
      id: "d1d13d13d1d3",
      published: true,
      title: "AI Chatbot",
      description: "An AI-powered chatbot",
      technologies: ["Python", "CHATGPT", "Flask"],
      link: "https://github.com/johndoe/ai-chatbot",
      dateMade: "2024-10-07",
      mediaId: "m3",
    },
  ];

  return c.json({ data: projects });
});

app.get("/media", (c) => {
  return c.json({
    data: [
      {
        media_id: "m1",
        media_type: "image",
        media_url: "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=format&fit=crop&w=300&h=200",
        media_description: "Screenshot of the portfolio website"
      },
      {
        media_id: "m2",
        media_type: "image",
        media_url: "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=format&fit=crop&w=300&h=200",
        media_description: "Demo video of the portfolio website"
      },
      {
        media_id: "m3",
        media_type: "image",
        media_url: "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=format&fit=crop&w=300&h=200",
        media_description: "Screenshot of the online store"
      }
    ]
  });
});

app.get("/student", (c) => {
  return c.json({
    name: "Joachim Lundsgaard Christiansen",
    degree: "Bachelor IT",
    points: 180,
    email: "student@hiof.no",
    experiences: [
      { description: "Figma UI for customer X" },
      { description: "Website for customer Y" },
      { description: "Figma UI for customer X" },
      { description: "Website for customer Y" },
      { description: "Figma UI for customer X" },
      { description: "Website for customer Y" }
    ]
  });
});


export default app;
