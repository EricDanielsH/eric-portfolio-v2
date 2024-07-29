import { Button } from "@/components/ui/moving-border";

export default function Contact() {
  return (
    <section
      id="contact"
      className="container max-h-[60vh] px-8 bg-neutral-900 text-white max-w-lg mt-20 mb-14 flex flex-col items-center"
    >
      <h2 className="text-xl md:text-4xl font-semibold text-center text-white mb-4 tracking-tight animate-fade-in-slide-up delay-long">
        Get in touch
      </h2>
      <p className="text-base md:text-lg text-neutral-200 text-center mb-14">
        I’m actively seeking new opportunities. My inbox is always open—whether
        you have a question or just want to say hi, I’ll try my best to get back
        to you!
      </p>
      <Button href="mailto:hey@gmail.com">
        <a
          href="mailto:eric@ericdaniels.dev"
          className="text-lg md:text-xl font-semibold text-neutral-100"
        >
          Say Hi
        </a>
      </Button>
    </section>
  );
}
