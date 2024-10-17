import prisma from "./dbinit";

async function main() {

    const mediaData = [
      {
        media_id: "m1",
        media_type: "image",
        media_url:
          "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=format&fit=crop&w=300&h=200",
        media_description: "Screenshot of the portfolio website",
      },
      {
        media_id: "m2",
        media_type: "image",
        media_url:
          "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=format&fit=crop&w=300&h=200",
        media_description: "Demo video of the portfolio website",
      },
      {
        media_id: "m3",
        media_type: "image",
        media_url:
          "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=format&fit=crop&w=300&h=200",
        media_description: "Screenshot of the online store",
      },
    ];
  
    for (const media of mediaData) {
      await prisma.media.create({
        data: media,
      });
    }
  
    const projectsData = [
      {
        id: "d1d13d13d1d1",
        published: 0,
        title: "Portfolio Website",
        description: "A personal portfolio website",
        technologies: "React,JavaScript,CSS,HTML",
        link: "https://Joachim.com/portfolio",
        dateMade: "2024-10-07",
        mediaId: "m1",
      },
      {
        id: "d1d13d13d1d2",
        published: 1,
        title: "Online store",
        description: "An online store platform built with Django.",
        technologies: "Django,Python,HTML",
        link: "https://onlinestore.com",
        dateMade: "2024-10-07",
        mediaId: "m2",
      },
      {
        id: "d1d13d13d1d3",
        published: 1,
        title: "AI Chatbot",
        description: "An AI-powered chatbot",
        technologies: "Python,CHATGPT,Flask",
        link: "https://github.com/johndoe/ai-chatbot",
        dateMade: "2024-10-07",
        mediaId: "m3",
      },
    ];
  
    for (const project of projectsData) {
      await prisma.project.create({
        data: project,
      });
    }
  
    const student = await prisma.student.create({
      data: {
        name: "Joachim Lundsgaard Christiansen",
        degree: "Bachelor IT",
        points: 180,
        email: "student@hiof.no",
        experiences: {
          create: [
            { description: "Figma UI for customer X" },
            { description: "Figma UI for customer X" },
            { description: "Website for customer Y" },
            { description: "Figma UI for customer X" },
            { description: "Website for customer Y" },
            { description: "Figma UI for customer X" },
            { description: "Website for customer Y" },
          ],
        },
      },
    });
  
    console.log({ student, projectsData, mediaData });
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });