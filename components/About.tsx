export default function About() {
  return (
    <section
      id="about"
      className="container px-8 bg-neutral-900 text-white max-w-2xl pt-[10vh] mb-20"
    >
      <h2 className="text-xl md:text-4xl font-semibold text-white mb-4 tracking-tight animate-fade-in-slide-up delay-long">
        About Me
      </h2>
      <p className="text-base md:text-lg text-neutral-300">
        As a seasoned software developer based in Lancaster, United Kingdom, I
        am deeply passionate about crafting innovative software solutions that
        address real-world challenges. With a proven track record of{" "}
        <strong className="text-white">rapid learning and adaptation</strong>, I thrive in dynamic
        environments where innovation and excellence are paramount.
        <br />
        <br />
        In my pursuit of knowledge, I am currently delving into the realms of{" "}
        <strong className="text-white">
          cybersecurity, blockchain technology, and quantum computing.
        </strong>{" "}
        These fields captivate my interest and fuel my ambition to
        contribute to the future of technology in meaningful ways.
        <br />
        <br />
        Beyond my professional endeavors, I am actively involved in the tech community. I participate in <strong className="text-white">conferences, hackathons, and meetups</strong>, where I enjoy sharing knowledge and learning from others. In my free time, I indulge in personal projects, exploring new programming paradigms and experimenting with the latest advancements in the field.
      </p>
    </section>
  );
}
