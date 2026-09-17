import type { WeddingContent } from "@/lib/types";

/**
 * Single source of truth for everything the guest sees.
 *
 * Replace the values below with the couple's real details, or move them into
 * Supabase and point `src/lib/content.ts` at the database provider.
 */
export const weddingContent: WeddingContent = {
  couple: {
    id: "couple-temitope-victor",
    brideFirstName: "Temitope",
    brideFullName: "Temitope",
    groomFirstName: "Victor",
    groomFullName: "Victor",
    shortNames: "Temitope & Victor",
    monogram: "T&V",
    hashtag: "#LOVETV",
    tagline: "are getting married",
    invitationEyebrow: "Tune in to",
    invitationHeadline: "#LOVETV",
    introduction:
      "Two hearts, one love story, and a celebration we cannot wait to share with you. Join us as we begin forever, dressed in joy, surrounded by family, with lots of laughing and dancing.",
    logo: {
      src: "/images/tv-logo.png",
      alt: "#LOVETV",
    },
    seal: {
      src: "/images/tv-seal.png",
      alt: "T&V wax seal",
    },
    heroPhoto: {
      src: "/images/hero-couple.jpeg",
      alt: "Temitope and Victor",
      caption: "Temitope & Victor, 2026",
    },
    portraitPhoto: {
      src: "/images/portrait-couple.jpeg",
      alt: "Temitope and Victor smiling together",
      caption: "Our favourite moment",
    },
  },

  meta: {
    id: "wedding-2026",
    startsAt: "2026-12-03T11:00:00+01:00",
    displayDate: "December 3rd, 2026",
    displayLocation: "Ojodu Berger, Lagos",
    city: "Lagos",
    country: "Nigeria",
    timezone: "Africa/Lagos",
    rsvpDeadline: "2026-10-30T23:59:00+01:00",
    rsvpDeadlineDisplay: "Friday, 30 October 2026",
    siteUrl: "https://lovetv.wedding",
    shareMessage:
      "Temitope & Victor are getting married on December 3rd, 2026. Tune in to #LOVETV and open your invitation here:",
    musicTrack: {
      src: "/audio/why-i-love-you.mp3",
      title: "Why I Love You by Major",
    },
  },

  events: [
    {
      id: "event-traditional",
      kind: "traditional",
      name: "Traditional Wedding",
      subtitle: "The main ceremony",
      description:
        "Join us for our traditional wedding ceremony, with colour, culture, music and the joy of two families becoming one.",
      startsAt: "2026-12-03T11:00:00+01:00",
      endsAt: "2026-12-03T13:00:00+01:00",
      displayDate: "Thursday, 3 December 2026",
      displayTime: "11:00 AM to 1:00 PM",
      venue: "Canaanland Event Centre",
      address: "10, Limson Road, Ojodu Berger, Lagos.",
      mapsQuery: "Canaanland Event Centre, 10 Limson Road, Ojodu Berger, Lagos",
      accentColor: "#c97885",
      photo: {
        src: "/images/event-traditional.jpg",
        alt: "Traditional wedding details and fabric",
      },
      notes: ["Please arrive by 10:30 AM so we can begin on time."],
    },
    {
      id: "event-reception",
      kind: "reception",
      name: "Reception",
      subtitle: "Food & Dancing",
      description:
        "The celebration continues with food, our first dance, and lots of merriment until the band stops singing.",
      startsAt: "2026-12-03T14:00:00+01:00",
      endsAt: "2026-12-03T22:00:00+01:00",
      displayDate: "Thursday, 3 December 2026",
      displayTime: "2:00 PM",
      venue: "Canaanland Event Centre",
      address: "10, Limson Road, Ojodu Berger, Lagos.",
      mapsQuery: "Canaanland Event Centre, 10 Limson Road, Ojodu Berger, Lagos",
      accentColor: "#b8956a",
      photo: {
        src: "/images/event-reception.jpg",
        alt: "Candlelit reception tables",
      },
      notes: ["Reception begins at 2:00 PM. Come ready to celebrate."],
    },
  ],

  story: [
    {
      id: "story-beginning",
      year: "The Beginning",
      title: "How It Started",
      location: "Lagos",
      body:
        "It started with conversations. Nothing too dramatic. We kept finding ourselves in situations that required us to spend time talking with each other and the fondness grew from there. After a couple weeks of constant communication, feelings of affection were expressed. Although we didn't start dating immediately, it felt like it was only a matter of time; and when the time was right, I, Victor took matters into my hands as Temitope wanted to take all the time in the whole world. Lol. Well, she said yes to being my girlfriend and here we are!",
      photo: {
        src: "/images/story-how-it-started.jpeg",
        alt: "Temitope and Victor, how it started",
      },
    },
    {
      id: "story-journey",
      year: "The Journey",
      title: "Growing Together",
      location: "Through every season",
      body:
        "From everyday moments to milestone memories, we learned to choose each other, in patience, in joy, and in faith.",
      photo: {
        src: "/images/story-growing-together.jpeg",
        alt: "Temitope and Victor growing together",
      },
    },
    {
      id: "story-forever",
      year: "2026",
      title: "Forever Starts Here",
      location: "Lagos",
      body:
        "On December 3rd, surrounded by the people who prayed us here, we say yes to forever. We cannot wait to celebrate with you.",
      photo: {
        src: "/images/story-forever-starts.jpeg",
        alt: "Temitope and Victor, forever starts here",
      },
    },
  ],

  asoEbi: {
    id: "aso-ebi-2026",
    headline: "Be Part of the Celebration",
    intro:
      "Our Aso Ebi is blush pink, the same beautiful cloth for ladies and gentlemen.",
    deadline: "2026-10-30T23:59:00+01:00",
    deadlineDisplay: "Friday, 30 October 2026",
    footnote: "Please note that this amount doesn't include dispatch.",
    showBankDetails: true,
    bankAccounts: [
      {
        bankName: "Access Bank",
        accountName: "Temitope Oladimeji",
        accountNumber: "0034074817",
        currency: "NGN",
        note: "Use your full name as the transfer reference.",
      },
    ],
    howToPurchase: [
      "Choose your option below and tap “Get Aso Ebi”.",
      "Transfer payment to the bank details in the Payment details section.",
      "Send your proof of payment, chosen option, and measurements to Funmilayo on WhatsApp.",
      "Collect your fabric before the deadline.",
    ],
    coordinator: {
      id: "contact-asoebi",
      name: "Funmilayo",
      role: "Aso Ebi Coordinator",
      phone: "+234 907 559 2973",
      whatsapp: "2349075592973",
    },
    options: [
      {
        id: "aso-ebi-ladies",
        name: "For the Ladies",
        fabric: "Blush pink Aso Ebi outfit, premium fabric with matching gele",
        currency: "NGN",
        colorway: "Blush pink",
        swatches: ["#e8a4ad", "#f5dde1", "#d4929c"],
        includes: ["Blush pink fabric cut to your chosen yardage", "Matching gele where selected"],
        photo: {
          src: "/images/asoebi-ladies.jpg",
          alt: "Ladies in blush pink Aso Ebi with caramel gold gele",
        },
        tiers: [
          { id: "ladies-3-gele", label: "3 yards & Gele", price: 55000 },
          { id: "ladies-5-gele", label: "5 yards & Gele", price: 75000 },
          { id: "ladies-gele", label: "Gele only", price: 10000 },
        ],
      },
      {
        id: "aso-ebi-gents",
        name: "For the Gentlemen",
        fabric: "Blush pink Aso Ebi outfit, premium fabric with matching cap",
        currency: "NGN",
        colorway: "Blush pink",
        swatches: ["#e8a4ad", "#f5dde1", "#d4929c"],
        includes: ["Blush pink fabric cut to your chosen yardage", "Matching cap where selected"],
        photo: {
          src: "/images/asoebi-gents.jpg",
          alt: "Gentlemen in blush pink Aso Ebi agbada with matching cap",
        },
        tiers: [
          { id: "gents-4-cap", label: "4 yards with Cap", price: 40000 },
          { id: "gents-8-cap", label: "8 yards with Cap", price: 60000 },
          { id: "gents-cap", label: "Cap only", price: 10000 },
        ],
      },
    ],
  },

  registry: {
    id: "registry-2026",
    headline: "We Truly Appreciate Your Generosity",
    intro:
      "Thank you for choosing to bless us as we begin our journey to forever. We wholeheartedly accept your gifts of love. You can monetise your gifts using the details below.",
    showBankDetails: true,
    bankAccounts: [
      {
        bankName: "Providus Bank",
        accountName: "Oladimeji Temitope Esther",
        accountNumber: "6504753013",
        currency: "NGN",
        note: "Please use your name as the transfer reference so we can thank you properly.",
      },
    ],
    items: [
      {
        id: "gift-cash",
        name: "Thank You For Your Gift of Love",
        category: "cash",
        description: "Tap below for Providus Bank details to send your gift.",
        currency: "NGN",
        photo: { src: "/images/registry-cash.jpg", alt: "A gold envelope resting on ivory paper" },
        isContribution: true,
      },
    ],
  },

  faqs: [
    {
      id: "faq-wear",
      question: "What should I wear?",
      answer:
        "The wedding colours are Blush pink and caramel. You can show up in our Aso Ebi, if you ordered it. However, it is not compulsory.",
      link: { label: "See the dress code", href: "#dress-code" },
    },
    {
      id: "faq-venue",
      question: "Where is the venue?",
      answer:
        "Both the traditional wedding and reception take place at Canaanland Event Centre, 10 Limson Road, Ojodu Berger, Lagos on December 3rd, 2026. Tap “Get Directions” on any event card for Google Maps.",
      link: { label: "View wedding details", href: "#wedding" },
    },
    {
      id: "faq-plus-one",
      question: "Can I bring a plus one?",
      answer:
        "Our invitation covers the names printed on it. If you were given a plus one, mention them in your RSVP note or message Esther on WhatsApp.",
    },
    {
      id: "faq-rsvp-when",
      question: "When should I RSVP?",
      answer: "By Friday, 30 October 2026 please.",
      link: { label: "RSVP now", href: "#rsvp" },
    },
    {
      id: "faq-aso-ebi",
      question: "Where can I get the Aso Ebi?",
      answer:
        "Tap “Get Aso Ebi” for pricing. Pay into the Access Bank account shown, then send your proof of payment to Funmilayo on +234 907 559 2973.",
      link: { label: "Get Aso Ebi", href: "#aso-ebi" },
    },
    {
      id: "faq-gift",
      question: "Can I send a gift?",
      answer:
        "Yes, you can. Please transfer a cash gift directly to the account details shown on the gift registry page.",
      link: { label: "View gift details", href: "#registry" },
    },
    {
      id: "faq-arrival",
      question: "What time should I arrive?",
      answer:
        "Traditional wedding: please arrive by 10:30 AM for an 11:00 AM start. Reception starts at 2pm.",
    },
    {
      id: "faq-photos",
      question: "Can I share photos online?",
      answer: "Please do! Tag everything #LOVETV so we can find them.",
    },
  ],

  gallery: [
    {
      src: "/images/gallery-couple-02.jpeg",
      alt: "Temitope and Victor painting together",
      caption: "Date night",
    },
    {
      src: "/images/gallery-couple-03.jpeg",
      alt: "Temitope and Victor smiling at home",
      caption: "Us",
    },
    {
      src: "/images/gallery-couple-04.jpeg",
      alt: "Temitope and Victor holding hands",
      caption: "Together",
    },
    {
      src: "/images/gallery-couple-05.jpeg",
      alt: "Temitope and Victor at an event",
      caption: "Celebrating",
    },
    {
      src: "/images/gallery-couple-06.jpeg",
      alt: "Temitope and Victor dressed up",
      caption: "Dressed up",
    },
    {
      src: "/images/gallery-couple-07.jpeg",
      alt: "Temitope and Victor sharing a moment",
      caption: "Our favourite",
    },
    {
      src: "/images/gallery-couple-08.jpeg",
      alt: "Temitope and Victor",
      caption: "#LOVETV",
    },
  ],

  dressCode: {
    id: "dress-code-2026",
    intro: "Come as yourself. These are the colours of the day.",
    colors: "Blush pink or caramel",
    note: "Traditional, formal, or cocktail, whatever you feel best in. Aso Ebi is welcome if you ordered it.",
    palette: [
      { name: "Blush pink", hex: "#e8a4ad" },
      { name: "Caramel", hex: "#b8956a" },
    ],
    photo: { src: "/images/dress-code.jpg", alt: "Guests in blush pink and caramel wedding attire" },
  },

  contacts: [
    {
      id: "contact-esther",
      name: "Esther",
      role: "Guest Support",
      phone: "+234 903 254 3184",
      whatsapp: "2349032543184",
    },
    {
      id: "contact-funmilayo",
      name: "Funmilayo",
      role: "Aso Ebi",
      phone: "+234 907 559 2973",
      whatsapp: "2349075592973",
    },
  ],

  socials: [
    { id: "social-instagram", label: "Instagram", href: "https://instagram.com/explore/tags/lovetv" },
    { id: "social-hashtag", label: "#LOVETV", href: "https://instagram.com/explore/tags/lovetv" },
  ],
};
