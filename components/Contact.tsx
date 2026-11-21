export default function Contact({ email, socials }: { email: string; socials: { label: string; href: string }[] }) {
  return (
    <footer id="contact" className="px-[6vw] py-[14vh]">
      <h2 className="h2 mb-10">Let&apos;s <span className="text-ac">talk</span></h2>
      <a href={`mailto:${email}`} className="glitch font-mono text-[clamp(1.2rem,5vw,4rem)] hover:text-ac" data-t={email}>{email} ↗</a>
      <div className="mt-10 flex gap-8 font-mono text-mut">
        {socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="hover:text-ac">{s.label} ↗</a>)}
      </div>
    </footer>
  );
}
