export const siteConfig = {
  name: "Yencoo",
  description: "Yencoo - Phase 1 Foundation",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  links: {
    github: "https://github.com/yencoo",
  },
};

export type SiteConfig = typeof siteConfig;
