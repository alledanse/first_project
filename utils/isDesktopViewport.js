export const isDesktopViewport = (page) => {
  const viewportSize = page.viewportSize();
  return viewportSize.width >= 600;
};
