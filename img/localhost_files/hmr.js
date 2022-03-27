import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/C:/Users/austria/Desktop/Github-repo/ASTRO/node_modules/astro/dist/runtime/client/hmr.js");if (import.meta.hot) {
  import.meta.hot.accept((mod) => mod);
  const parser = new DOMParser();
  import.meta.hot.on("astro:update", async ({ file }) => {
    const { default: diff } = await import('/node_modules/micromorph/index.mjs?v=2c2dc583');
    console.log(`[vite] hot updated: ${file}`);
    const html = await fetch(`${window.location}`).then((res) => res.text());
    const doc = parser.parseFromString(html, "text/html");
    for (const root of doc.querySelectorAll("astro-root")) {
      const uid = root.getAttribute("uid");
      const current = document.querySelector(`astro-root[uid="${uid}"]`);
      if (current) {
        root.innerHTML = current == null ? void 0 : current.innerHTML;
      }
    }
    diff(document, doc);
  });
}
