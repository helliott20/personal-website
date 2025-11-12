document.addEventListener("DOMContentLoaded", () => {
  const DEFAULT_THEME = "light";

  const state = {
    theme: DEFAULT_THEME,
  };
  const $moon = document.getElementById("moon");
  const $sun = document.getElementById("sun");
  const $toggles = document.querySelectorAll(".toggle");

  const detectOSTheme = () => {
    if (!window.matchMedia) {
      // matchMedia method not supported
      return DEFAULT_THEME;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // OS theme setting detected as dark
      return "dark";
    } else {
      return DEFAULT_THEME;
    }
  };

  const setTheme = (theme, save = true) => {
    document.documentElement.setAttribute("data-theme", theme);
    state.theme = theme;

    if (theme === "dark") {
      $moon.classList.remove("is-off");
      $sun.classList.add("is-off");
    }

    if (theme === "light") {
      $moon.classList.add("is-off");
      $sun.classList.remove("is-off");
    }

    if (save) {
      window.localStorage.setItem("theme", theme);
    }
  };

  // Theme init
  const localTheme = window.localStorage.getItem("theme");

  if (localTheme) {
    setTheme(localTheme, false);
  } else {
    const OSTheme = detectOSTheme();
    setTheme(OSTheme, true);
  }

  // Events
  $moon.addEventListener("click", (e) => {
    e.preventDefault();
    setTheme("dark");
  });

  $sun.addEventListener("click", (e) => {
    e.preventDefault();
    setTheme("light");
  });

  $toggles.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const targetID = el.dataset.target;
      const targetEl = document.getElementById(targetID);
      targetEl.classList.toggle("is-hidden");
    });
  });

  // Photoswipe
  const $pswpThumbnails = document.querySelectorAll(".pswp-thumbnail");

  const openPhotoSwipe = (el, index) => {
    const pswpElement = document.querySelectorAll(".pswp")[0];

    // build items array
    const pswpItems = [
      {
        src: "/static/books/css44/steps/step-01-original@2x.jpg",
        thumbnail: "/static/books/css44/steps/step-01@2x.jpg",
        w: 1200,
        h: 800,
        title: "Step 1",
      },
      {
        src: "/static/books/css44/steps/step-02-original@2x.jpg",
        thumbnail: "/static/books/css44/steps/step-02@2x.jpg",
        w: 1200,
        h: 800,
        title: "Step 2",
      },
      {
        src: "/static/books/css44/steps/step-03-original@2x.jpg",
        thumbnail: "/static/books/css44/steps/step-03@2x.jpg",
        w: 1200,
        h: 800,
        title: "Step 3",
      },
      {
        src: "/static/books/css44/steps/step-04-original@2x.jpg",
        thumbnail: "/static/books/css44/steps/step-04@2x.jpg",
        w: 1200,
        h: 800,
        title: "Step 4",
      },
      {
        src: "/static/books/css44/steps/step-05-original@2x.jpg",
        thumbnail: "/static/books/css44/steps/step-05@2x.jpg",
        w: 1200,
        h: 800,
        title: "Step 5",
      },
      {
        src: "/static/books/css44/alternatives/julia@2x.jpg",
        thumbnail: "/static/books/css44/alternatives/julia-thumbnail@2x.jpg",
        w: 1200,
        h: 800,
        title: "Julia version",
      },
      {
        src: "/static/books/css44/alternatives/leon@2x.jpg",
        thumbnail: "/static/books/css44/alternatives/leon-thumbnail@2x.jpg",
        w: 1120,
        h: 700,
        title: "Leon version",
      },
      {
        src: "/static/books/css44/alternatives/oliver@2x.jpg",
        thumbnail: "/static/books/css44/alternatives/oliver-thumbnail@2x.jpg",
        w: 1120,
        h: 700,
        title: "Oliver version",
      },
      {
        src: "/static/books/css44/alternatives/sam@2x.jpg",
        thumbnail: "/static/books/css44/alternatives/sam-thumbnail@2x.jpg",
        w: 1120,
        h: 700,
        title: "Sam version",
      },
    ];

    // define options (if needed)
    const pswpOptions = {
      bgOpacity: 0.93,
      closeOnScroll: false,
      getThumbBoundsFn: function () {
        const thumbnail = el.getElementsByTagName("img")[0];
        const pageYScroll = document.documentElement.scrollTop;
        const rect = thumbnail.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width,
        };
      },
      history: false,
      index: parseInt(index, 10),
      showHideOpacity: false,
    };

    // Initializes and opens PhotoSwipe
    const pswpGallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pswpItems, pswpOptions);
    pswpGallery.init();
  };

  if ($pswpThumbnails.length > 0) {
    $pswpThumbnails.forEach((el, index) => {
      el.addEventListener("click", () => {
        openPhotoSwipe(el, index);
      });
    });
  }
});
