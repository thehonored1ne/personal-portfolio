import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { projects } from "@/data/portfolio";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Portfolio" },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
    meta: { title: "About" },
  },
  {
    path: "/experience",
    name: "experience",
    component: () => import("@/views/ExperienceView.vue"),
    meta: { title: "Experience" },
  },
  {
    path: "/education",
    name: "education",
    component: () => import("@/views/EducationView.vue"),
    meta: { title: "Education" },
  },
  {
    path: "/certifications",
    name: "certifications",
    component: () => import("@/views/CertificationsView.vue"),
    meta: { title: "Certifications" },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/ContactView.vue"),
    meta: { title: "Contact" },
  },
  {
    path: "/project/:slug",
    name: "project-detail",
    component: () => import("@/views/ProjectDetailView.vue"),
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
  if (to.name === "project-detail" && to.params.slug) {
    const project = projects.find((p) => p.slug === to.params.slug);
    if (project) {
      document.title = `${project.title} — Dion Areglo`;
      return;
    }
  }

  if (to.meta && to.meta.title && to.name !== "home") {
    document.title = `${to.meta.title} — Dion Areglo`;
  } else {
    document.title = baseTitle;
  }
});

export default router;