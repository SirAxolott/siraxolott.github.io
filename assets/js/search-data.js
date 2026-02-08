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
            },},{id: "news-main-board-v1-1-for-op-keyboard-v1-has-been-sent-for-manufacturing-and-a-finalized-v1-update-is-coming-soon",
          title: 'Main board v1.1 for OP Keyboard V1 has been sent for manufacturing, and...',
          description: "",
          section: "News",},{id: "news-plate-mounting-for-op-keyboard-v1-1-is-changing-to-a-sandwich-setup-and-i-will-be-testing-poron-foam-strips",
          title: 'Plate mounting for OP Keyboard V1.1 is changing to a sandwich setup, and...',
          description: "",
          section: "News",},{id: "news-the-op-keyboard-v2-pcb-is-ready-and-will-be-sent-for-manufacturing-soon",
          title: 'The OP Keyboard V2 PCB is ready and will be sent for manufacturing...',
          description: "",
          section: "News",},{id: "projects-diy-mechanical-keyboard",
          title: 'DIY Mechanical Keyboard',
          description: "A customizable home-made keyboard",
          section: "Projects",handler: () => {
              window.location.href = "/projects/DIY%20Mechanical%20Keyboard/";
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
