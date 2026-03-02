// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of my cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-diy-keyboard-update",
        
          title: "DIY Keyboard Update",
        
        description: "Quick update on my progress for the OP Keyboard project.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/kbv1-update/";
          
        },
      },{id: "post-diy-keyboard-v1",
        
          title: "DIY Keyboard V1",
        
        description: "My first mechanical keyboard build!",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/kbv1/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-i-sent-the-op-keyboard-v1-1-main-board-and-the-firefly-v0-1-pcb-out-for-manufacturing-together",
          title: 'I sent the OP Keyboard V1.1 main board and the FireFly v0.1 PCB...',
          description: "",
          section: "News",},{id: "news-i-am-switching-the-keyboard-to-a-gasket-mount-using-foam-strips",
          title: 'I am switching the keyboard to a gasket mount using foam strips.',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/opkeyboardv1_1_plate/";
            },},{id: "news-i-just-wrapped-the-op-keyboard-v2-pcb-and-i-am-sending-it-out-for-manufacturing-soon",
          title: 'I just wrapped the OP Keyboard V2 PCB, and I am sending it...',
          description: "",
          section: "News",},{id: "projects-diy-mechanical-keyboard",
          title: 'DIY Mechanical Keyboard',
          description: "A customizable home-made keyboard",
          section: "Projects",handler: () => {
              window.location.href = "/projects/DIY%20Mechanical%20Keyboard/";
            },},{id: "projects-ece-352-course-project",
          title: 'ECE 352 Course Project',
          description: "FPGA-Based Machine Learning Motion Detection System",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ECE352%20Course%20Project/";
            },},{id: "projects-firefly-microdrone",
          title: 'FireFly Microdrone',
          description: "Open-source microdrone firmware, control stack, and custom hardware.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/FireFly%20Drone/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6F%73%70%61%74%69%6C@%77%69%73%63.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/SirAxolott", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/ojas-patil-250241316", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
