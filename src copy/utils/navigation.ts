const normalizePath = (path: string) => {
  if (!path || path === '/') {
    return '/';
  }
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

export const createIsActiveChecker = (currentPath: string, homeHref: string) => {
  const normalizedCurrentPath = normalizePath(currentPath);
  const normalizedHomeHref = normalizePath(homeHref);

  return (href: string) => {
    const normalizedHref = normalizePath(href);

    if (normalizedCurrentPath === normalizedHref) {
      return true;
    }

    if (normalizedHref === normalizedHomeHref) {
      return normalizedCurrentPath === normalizedHomeHref;
    }

    return normalizedCurrentPath.startsWith(`${normalizedHref}/`);
  };
};
