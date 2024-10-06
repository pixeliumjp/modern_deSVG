// deSVG module
const deSVG = async (selector, removeInlineCss = false) => {
  // Use a Map for more efficient key-value management of images by URL
  const sortImages = new Map();

  // Fetch SVG content asynchronously
  const loadSvg = async (imgURL, replaceImages) => {
    try {
      const response = await fetch(imgURL);
      if (!response.ok) throw new Error("Failed to fetch SVG");

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "image/svg+xml");

      if (!xml) return;

      // Grab the <svg /> element
      const svg = xml.documentElement;
      const paths = svg.querySelectorAll("path");

      // Remove inline CSS if specified
      if (removeInlineCss) {
        paths.forEach((path) => path.removeAttribute("style"));
      }

      // Remove `xmlns:a` if it exists
      svg.removeAttribute("xmlns:a");

      // Replace all the images with the SVG
      replaceImages.forEach((img) =>
        replaceImgWithSvg(img, svg.cloneNode(true))
      );
    } catch (error) {
      console.error(`Error loading SVG: ${error}`);
    }
  };

  // Replace the original <img /> with the new <svg />
  const replaceImgWithSvg = (img, svg) => {
    const imgID = img.id;
    const imgClasses = img.getAttribute("class");

    if (imgID) {
      svg.id = imgID;
    }

    if (imgClasses) {
      svg.setAttribute("class", `${imgClasses} replaced-svg`);
    }

    img.parentNode.replaceChild(svg, img);
  };

  // Collect all images matching the selector
  const images = document.querySelectorAll(selector);

  images.forEach((img) => {
    // Use modern optional chaining and nullish coalescing operators
    const imgURL = img.getAttribute("data-src") ?? img.getAttribute("src");
    if (imgURL) {
      if (!sortImages.has(imgURL)) {
        sortImages.set(imgURL, []);
      }
      sortImages.get(imgURL).push(img);
    }
  });

  // Iterate over the sorted images and load the corresponding SVGs
  for (const [imgURL, imgArray] of sortImages.entries()) {
    await loadSvg(imgURL, imgArray);
  }
};

export { deSVG };
