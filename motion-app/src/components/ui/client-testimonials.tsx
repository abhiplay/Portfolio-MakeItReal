import type { Testimonial } from "@/components/ui/glass-testimonial-swiper";
import { TestimonialStack } from "@/components/ui/glass-testimonial-swiper";

/* Kind words from collaborators. Names and roles only, as supplied. Each
   card shows an initials avatar, so no photos are needed. */

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    initials: "PS",
    name: "Priya Sharma",
    role: "Product Manager",
    quote:
      "Abhinesh has a strong ability to break down complex problems and turn them into intuitive product experiences. He looks beyond the visuals, understands the underlying user needs, and consistently brings clarity to the design process.",
    avatarGradient: "linear-gradient(135deg, #5e6ad2, #8b5cf6)",
  },
  {
    id: 2,
    initials: "RM",
    name: "Rahul Mehta",
    role: "UX Lead",
    quote:
      "What I appreciate about working with Abhinesh is his thoughtful approach to UX. He takes the time to understand the problem, considers different perspectives, and creates solutions that balance user needs with business goals.",
    avatarGradient: "linear-gradient(135deg, #10b981, #059669)",
  },
  {
    id: 3,
    initials: "SK",
    name: "Sneha Kapoor",
    role: "Project Manager",
    quote:
      "Abhinesh is a collaborative designer who communicates his ideas clearly and works well across teams. He welcomes feedback, challenges assumptions constructively, and helps the team move from ambiguous requirements to well-defined solutions.",
    avatarGradient: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  {
    id: 4,
    initials: "AN",
    name: "Arjun Nair",
    role: "Engineering Lead",
    quote:
      "Abhinesh combines strong visual design skills with a solid understanding of usability and interaction design. His attention to detail and focus on consistency help create digital experiences that feel intuitive, polished, and purposeful.",
    avatarGradient: "linear-gradient(135deg, #ec4899, #d946ef)",
  },
  {
    id: 5,
    initials: "VD",
    name: "Vikram Desai",
    role: "Senior Product Manager",
    quote:
      "Abhinesh brings a strong sense of ownership to his work, from understanding the initial problem to refining the final experience. He approaches challenges with curiosity, adapts to constraints, and stays focused on delivering practical design solutions.",
    avatarGradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
  },
];

export function ClientTestimonials() {
  return (
    <div>
      <div className="mb-[48px] text-center">
        <p className="mb-[16px] text-[18px] font-medium uppercase text-white">What people say</p>
        <h2 className="font-display text-[8vw] font-bold leading-[0.95] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
          Kind words from collaborators
        </h2>
      </div>
      <TestimonialStack testimonials={TESTIMONIALS} />
    </div>
  );
}
