function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

window.addEventListener("DOMContentLoaded", async () => {
  const particlesInstance = await tsParticles.load({
    id: "tsparticles",
    options: {
      preset: "stars",
      fullScreen: {
        enable: true,
        zIndex: 0
      }
    }
  });

  const refreshParticles = debounce(() => {
    particlesInstance.refresh();
  }, 1);

  window.addEventListener("resize", refreshParticles);
});