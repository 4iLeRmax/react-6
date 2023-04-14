import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    width={470}
    height={400}
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
  >
    {/* <rect x="43" y="304" rx="4" ry="4" width="271" height="9" /> */}
    <rect x="30" y="295" rx="20" ry="20" width="130" height="80" />
    <rect x="170" y="295" rx="20" ry="20" width="130" height="80" />
    <rect x="310" y="295" rx="20" ry="20" width="130" height="80" />
    <rect x="30" y="30" rx="30" ry="30" width="410" height="250" />

    <rect x="30" y="390" rx="5" ry="5" width="300" height="35" />
  </ContentLoader>
);
