import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ExperienceView from "@/views/ExperienceView.vue";
import EducationView from "@/views/EducationView.vue";
import CertificationsView from "@/views/CertificationsView.vue";
import ContactView from "@/views/ContactView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { projects } from "@/data/portfolio";

const siteUrl = "https://dionareglo.dev";
const defaultDescription =
  "Portfolio of Dion Areglo, a Frontend Engineer and Interface Designer based in Manila, Philippines.";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Portfolio", description: defaultDescription },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: { title: "About", description: "Background, values, and current focus of Dion Areglo." },
  },
  {
    path: "/experience",
    name: "experience",
    component: ExperienceView,
    meta: { title: "Experience", description: "Career timeline and technical contributions by Dion Areglo." },
  },
  {
    path: "/education",
    name: "education",
    component: EducationView,
    meta: { title: "Education", description: "Academic background, foundation, and studies of Dion Areglo." },
  },
  {
    path: "/certifications",
    name: "certifications",
    component: CertificationsView,
    meta: { title: "Certifications", description: "Verified credentials and technical accreditations earned by Dion Areglo." },
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
    meta: { title: "Contact", description: "Get in touch with Dion Areglo for collaborations and project inquiries." },
  },
  {
    path: "/project/:slug",
    name: "project-detail",
    component: () => import("@/views/ProjectDetailView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
    meta: {
      title: "Page Not Found",
      description: "The page you requested could not be found.",
      noIndex: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const baseTitle = "Dion Areglo — Frontend Engineer & Interface Designer";
  let title = baseTitle;
  let description = (to.meta.description as string) || defaultDescription;

  if (to.name === "project-detail" && to.params.slug) {
    const project = projects.find((p) => p.slug === to.params.slug);
    if (project) {
      title = `${project.title} — Dion Areglo`;
      description = project.tagline;
    }
  } else if (to.meta.title && to.name !== "home") {
    title = `${to.meta.title} — Dion Areglo`;
  }

  document.title = title;
  const canonicalUrl = `${siteUrl}${to.path === "/" ? "/" : to.path}`;
  const setMeta = (selector: string, attribute: string, content: string) => {
    const element = document.querySelector<HTMLMetaElement>(selector);
    if (element) element.setAttribute(attribute, content);
  };

  setMeta('meta[name="title"]', "content", title);
  setMeta('meta[name="description"]', "content", description);
  setMeta('meta[name="robots"]', "content", to.meta.noIndex ? "noindex, follow" : "index, follow, max-image-preview:large");
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", canonicalUrl);
  setMeta('meta[property="og:image"]', "content", `${siteUrl}/og-image.webp`);
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
  setMeta('meta[name="twitter:url"]', "content", canonicalUrl);
  setMeta('meta[name="twitter:image"]', "content", `${siteUrl}/og-image.webp`);

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", canonicalUrl);
});

export default router;
