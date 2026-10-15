import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/experience",
    name: "experience",
    component: () => import("@/views/ExperienceView.vue"),
  },
  {
    path: "/education",
    name: "education",
    component: () => import("@/views/EducationView.vue"),
  },
  {
    path: "/certifications",
    name: "certifications",
    component: () => import("@/views/CertificationsView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/ContactView.vue"),
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

export default router;
