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
    brideFullName: "Temitope Oladimeji",
    groomFirstName: "Victor",
    groomFullName: "Victor",
    shortNames: "Temitope & Victor",
    monogram: "T&V",
    hashtag: "#LOVETV",
    tagline: "are getting married",
    invitationEyebrow: "Tune in to",
    invitationHeadline: "#LOVETV",
    introduction:
      "Two hearts, one love story, and a celebration we cannot wait to share with you. Join us as we begin forever — dressed in joy, surrounded by family, and dancing far too late into the night.",
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
    displayLocation: "Lagos, Nigeria",
    city: "Lagos",
    country: "Nigeria",
    timezone: "Africa/Lagos",
    rsvpDeadline: "2026-10-30T23:59:00+01:00",
    rsvpDeadlineDisplay: "Friday, 30 October 2026",
    siteUrl: "https://lovetv.wedding",
    shareMessage:
      "Temitope & Victor are getting married on December 3rd, 2026. Tune in to #LOVETV — open your invitation here:",
    musicTrack: {
      src: "/audio/why-i-love-you.mp3",
      title: "Why I Love You — Major",
    },
  },

  events: [
    {
      id: "event-traditional",
      kind: "traditional",
      name: "Traditional Wedding",
      subtitle: "The main ceremony",
      description:
        "Join us for our traditional wedding ceremony — colour, culture, music and the joy of two families becoming one.",
      startsAt: "2026-12-03T11:00:00+01:00",
      endsAt: "2026-12-03T13:00:00+01:00",
      displayDate: "Thursday, 3 December 2026",
      displayTime: "11:00 AM — 1:00 PM",
      venue: "Venue details coming soon",
      address: "Lagos, Nigeria",
      mapsQuery: "Lagos, Nigeria",
      dressCode: "Aso Ebi or Nigerian traditional attire in blush pink tones",
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
      subtitle: "Dinner & Dancing",
      description:
        "The celebration continues with dinner, speeches, our first dance, and dancing until our feet give out.",
      startsAt: "2026-12-03T14:00:00+01:00",
      endsAt: "2026-12-03T22:00:00+01:00",
      displayDate: "Thursday, 3 December 2026",
      displayTime: "2:00 PM — 10:00 PM",
      venue: "Venue details coming soon",
      address: "Lagos, Nigeria",
      mapsQuery: "Lagos, Nigeria",
      dressCode: "Cocktail glamour — blush, caramel and black",
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
        "Every great love story has a first chapter. Ours began with laughter, long conversations, and the quiet certainty that this was something special.",
      photo: {
        src: "/images/gallery-couple-01.jpeg",
        alt: "Temitope and Victor",
      },
    },
    {
      id: "story-journey",
      year: "The Journey",
      title: "Growing Together",
      location: "Through every season",
      body:
        "From everyday moments to milestone memories, we learned to choose each other — in patience, in joy, and in faith.",
      photo: {
        src: "/images/portrait-couple.jpeg",
        alt: "Temitope and Victor together",
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
        src: "/images/hero-couple.jpeg",
        alt: "Temitope and Victor",
      },
    },
  ],

  asoEbi: {
    id: "aso-ebi-2026",
    headline: "Be Part of the Celebration",
    intro:
      "Our Aso Ebi is blush pink — the same beautiful cloth for ladies and gentlemen. Wearing it is entirely optional, and you are loved either way.",
    deadline: "2026-10-15T23:59:00+01:00",
    deadlineDisplay: "Thursday, 15 October 2026",
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
      email: "asoebi@lovetv.wedding",
    },
    options: [
      {
        id: "aso-ebi-ladies",
        name: "For the Ladies",
        fabric: "Blush pink Aso Ebi outfit — premium fabric with matching gele",
        currency: "NGN",
        colorway: "Blush pink",
        swatches: ["#e8a4ad", "#f5dde1", "#d4929c"],
        includes: ["Blush pink fabric cut to your chosen yardage", "Matching gele where selected"],
        photo: {
          src: "/images/asoebi-ladies.jpg",
          alt: "Blush pink ladies Aso Ebi fabric and gele",
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
        fabric: "Blush pink Aso Ebi outfit — premium fabric with matching cap",
        currency: "NGN",
        colorway: "Blush pink",
        swatches: ["#e8a4ad", "#f5dde1", "#d4929c"],
        includes: ["Blush pink fabric cut to your chosen yardage", "Matching cap where selected"],
        photo: {
          src: "/images/asoebi-gents.jpg",
          alt: "Blush pink gentlemen Aso Ebi fabric and cap",
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
    headline: "Your Presence Is Our Greatest Gift",
    intro:
      "Truly — showing up is more than enough. But we have been asked so many times that we finally made a list. Everything here is optional.",
    note: "Gifts can also be brought on the day. For cash gifts, transfer directly to the account shown.",
    showBankDetails: true,
    bankAccounts: [
      {
        bankName: "Access Bank",
        accountName: "Temitope Oladimeji",
        accountNumber: "0034074817",
        currency: "NGN",
        note: "Please use your name as the transfer reference so we can thank you properly.",
      },
    ],
    items: [
      {
        id: "gift-mixer",
        name: "Kitchen Stand Mixer",
        category: "home",
        description:
          "For the Sunday baking sessions and jollof experiments we have planned for our new home.",
        amount: 185000,
        currency: "NGN",
        photo: { src: "/images/registry-home.jpg", alt: "A stand mixer on a kitchen counter" },
        isContribution: true,
      },
      {
        id: "gift-linens",
        name: "Linen Bedding Set",
        category: "home",
        description: "Soft, stone-washed linen in blush and ivory — for slow mornings together.",
        amount: 120000,
        currency: "NGN",
        photo: { src: "/images/registry-linen.jpg", alt: "Folded linen bedding" },
        isContribution: true,
      },
      {
        id: "gift-flights",
        name: "Honeymoon Flights",
        category: "travel",
        description: "Help us get to our honeymoon destination — every mile is a memory waiting to happen.",
        amount: 250000,
        currency: "NGN",
        photo: { src: "/images/registry-travel.jpg", alt: "Turquoise water and a wooden boat" },
        isContribution: true,
      },
      {
        id: "gift-villa",
        name: "A Night by the Water",
        category: "travel",
        description: "Gift us one night of our honeymoon stay — sunrise swim included.",
        amount: 180000,
        currency: "NGN",
        photo: { src: "/images/registry-villa.jpg", alt: "A quiet beach house terrace at sunrise" },
        isContribution: true,
      },
      {
        id: "gift-spa",
        name: "Couples Spa Day",
        category: "experiences",
        description: "A relaxed afternoon of massages and quiet — our treat to ourselves after the wedding whirlwind.",
        amount: 95000,
        currency: "NGN",
        photo: { src: "/images/registry-experience.jpg", alt: "Spa essentials and warm towels" },
        isContribution: true,
      },
      {
        id: "gift-portrait",
        name: "Our First Home Portrait",
        category: "other",
        description:
          "A commissioned painting of the two of us, for the wall of whatever home we build together.",
        amount: 220000,
        currency: "NGN",
        photo: { src: "/images/registry-portrait.jpg", alt: "A framed portrait on a warm wall" },
        isContribution: true,
      },
      {
        id: "gift-cash",
        name: "Bless Us As You Are Led",
        category: "cash",
        description:
          "No amount, no expectation. If you would prefer to give cash, transfer to the account below — we receive it with both hands.",
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
        "Traditional wedding: Aso Ebi if you ordered it, otherwise Nigerian traditional attire in blush pink, caramel or black. Reception: cocktail glamour in the same palette. Please leave full white for the bride.",
      link: { label: "See the dress code", href: "#dress-code" },
    },
    {
      id: "faq-venue",
      question: "Where is the venue?",
      answer:
        "Both the traditional wedding and reception take place in Lagos on December 3rd, 2026. Full venue addresses will be shared closer to the date — each event card has a “Get Directions” button when details are confirmed.",
      link: { label: "View wedding details", href: "#wedding" },
    },
    {
      id: "faq-plus-one",
      question: "Can I bring a plus one?",
      answer:
        "Our invitation covers the names printed on it. If you were given a plus one, you can add them when you RSVP.",
    },
    {
      id: "faq-rsvp-when",
      question: "When should I RSVP?",
      answer:
        "By Friday, 30 October 2026 please. Catering numbers are confirmed the following week.",
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
        "Your presence really is the gift. Browse our registry for ideas, or transfer a cash gift directly to the account shown on the registry page.",
      link: { label: "Visit the registry", href: "#registry" },
    },
    {
      id: "faq-arrival",
      question: "What time should I arrive?",
      answer:
        "Traditional wedding: please arrive by 10:30 AM for an 11:00 AM start. Reception: from 2:00 PM.",
    },
    {
      id: "faq-photos",
      question: "Can I share photos online?",
      answer: "Please do — tag everything #LOVETV so we can find them.",
    },
  ],

  gallery: [
    { src: "/images/hero-couple.jpeg", alt: "Temitope and Victor", caption: "Temitope & Victor" },
    { src: "/images/portrait-couple.jpeg", alt: "Temitope and Victor smiling", caption: "Together" },
    { src: "/images/gallery-couple-01.jpeg", alt: "Temitope and Victor", caption: "#LOVETV" },
    { src: "/images/gallery-03.jpg", alt: "Celebration moment", caption: "Joy" },
    { src: "/images/gallery-06.jpg", alt: "Golden hour", caption: "Golden hour" },
    { src: "/images/gallery-08.jpg", alt: "Behind the scenes", caption: "Behind the scenes" },
  ],

  dressCode: [
    {
      id: "dress-traditional",
      eventName: "Traditional Wedding",
      title: "Blush & Caramel",
      guidance:
        "Nigerian traditional attire. Ladies in George, lace or Ankara with a gele; gentlemen in agbada, kaftan or senator. Aso Ebi is welcome but never required.",
      palette: [
        { name: "Blush", hex: "#e8a4ad" },
        { name: "Blush Light", hex: "#f5dde1" },
        { name: "Caramel", hex: "#b8956a" },
        { name: "Black", hex: "#1d1916" },
      ],
      avoid: "Please avoid full white — reserved for the bride.",
      photo: { src: "/images/dress-traditional.jpg", alt: "Blush and caramel traditional attire" },
    },
    {
      id: "dress-reception",
      eventName: "Reception",
      title: "Cocktail Glamour",
      guidance:
        "Formal or cocktail wear in blush, caramel, ivory or black. Bring shoes you can dance in.",
      palette: [
        { name: "Ivory", hex: "#f4ede1" },
        { name: "Blush", hex: "#e8a4ad" },
        { name: "Caramel", hex: "#b8956a" },
        { name: "Black", hex: "#1d1916" },
      ],
      avoid: "Please avoid full white head-to-toe.",
      photo: { src: "/images/dress-white.jpg", alt: "Elegant reception attire" },
    },
  ],

  contacts: [
    {
      id: "contact-primary",
      name: "Wedding Coordinator",
      role: "Guest Support",
      phone: "+234 800 000 0000",
      whatsapp: "2348000000000",
      email: "hello@lovetv.wedding",
    },
  ],

  socials: [
    { id: "social-instagram", label: "Instagram", href: "https://instagram.com/explore/tags/lovetv" },
    { id: "social-hashtag", label: "#LOVETV", href: "https://instagram.com/explore/tags/lovetv" },
  ],
};
