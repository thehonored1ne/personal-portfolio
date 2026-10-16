import { onMounted, onUnmounted, type Ref } from "vue";
import { gsap } from "gsap";

export function useStaggerEntrance(container: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    if (!container.value) return;

    ctx = gsap.context(() => {
      const root = container.value;
      if (!root) return;

      const sections = root.querySelectorAll<HTMLElement>("[data-animate]");
      if (!sections.length) return;

      gsap.set(root, { opacity: 0, y: 18 });
      gsap.set(sections, { opacity: 0, y: 28 });

      const timeline = gsap.timeline();

      timeline.to(root, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      timeline.to(sections, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "all",
      }, "-=0.28");

      timeline.set(root, { clearProps: "all" });
    }, container.value);
  });

  onUnmounted(() => {
    ctx?.revert();
  });
}
