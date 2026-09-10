import { InvitationGate } from "@/components/experience/InvitationGate";
import { Footer } from "@/components/layout/Footer";
import { MusicProvider } from "@/components/layout/MusicProvider";
import { MusicToggle } from "@/components/layout/MusicToggle";
import { Navbar } from "@/components/layout/Navbar";
import { StickyRsvpBar } from "@/components/layout/StickyRsvpBar";
import { AsoEbi } from "@/components/sections/AsoEbi";
import { Contact } from "@/components/sections/Contact";
import { DressCode } from "@/components/sections/DressCode";
import { Events } from "@/components/sections/Events";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Registry } from "@/components/sections/Registry";
import { Rsvp } from "@/components/sections/Rsvp";
import { Story } from "@/components/sections/Story";
import { getWeddingContent } from "@/lib/content";

export default async function HomePage() {
  const content = await getWeddingContent();
  const { couple, meta, events, story, asoEbi, registry, faqs, gallery, dressCode, contacts, socials } =
    content;

  return (
    <MusicProvider track={meta.musicTrack}>
      <InvitationGate couple={couple} meta={meta}>
        <Navbar couple={couple} meta={meta} />

        <main>
          <Hero couple={couple} meta={meta} />
          <Story story={story} couple={couple} />
          <Events events={events} couple={couple} />
          <Rsvp couple={couple} meta={meta} events={events} contact={contacts[0]} />
          <AsoEbi asoEbi={asoEbi} couple={couple} />
          <DressCode looks={dressCode} couple={couple} />
          <Gallery photos={gallery} couple={couple} />
          <Registry registry={registry} couple={couple} contact={contacts[0]} />
          <Faq faqs={faqs} />
          <Contact contacts={contacts} couple={couple} />
        </main>

        <Footer couple={couple} meta={meta} socials={socials} />
        <StickyRsvpBar meta={meta} />
        <MusicToggle meta={meta} />
      </InvitationGate>
    </MusicProvider>
  );
}
