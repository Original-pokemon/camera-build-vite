const useSmoothScrollToElement = () => {
  const scrollToTop = (element: HTMLElement = document.body) => {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return scrollToTop;
};

export default useSmoothScrollToElement;
