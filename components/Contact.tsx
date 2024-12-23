import { Button } from "@/components/ui/moving-border";

export default function Contact() {
  return (
    <section
      id="contact"
      className="container max-h-[60vh] px-8 bg-neutral-900 text-white max-w-lg pt-[10vh] mb-20 flex flex-col items-center"
    >
      <h2 className="text-xl md:text-4xl font-semibold text-center text-white mb-4 tracking-tight animate-fade-in-slide-up delay-long">
        Get in touch
      </h2>
      <p className="text-base md:text-lg text-neutral-200 text-center mb-14">
        I’m actively seeking new opportunities. My inbox is always open—whether
        you have a question or just want to say hi, I’ll try my best to get back
        to you!
      </p>
      <Button containerClassName="hover:text-[#ff1717] transition duration-200">
        <a
          href="mailto:portfolio@ericdaniels.dev"
          className="text-lg md:text-xl font-semibold text-neutral-100 font-mono tracking-tighter hover:text-[#ff1717] transition duration-200"
        >
          Say Hi
        </a>
      </Button>
    </section>
  );
}
