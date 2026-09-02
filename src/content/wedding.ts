import type { WeddingContent } from "@/lib/types";

/**
 * Single source of truth for everything the guest sees.
 *
 * Replace the values below with the couple's real details, or move them into
 * Supabase and point `src/lib/content.ts` at the database provider.
 */
export const weddingContent: WeddingContent = {
  couple: {
    id: "couple-ada-tobi",
    brideFirstName: "Ada",
    brideFullName: "Adaeze Chidinma Nwachukwu",
    groomFirstName: "Tobi",
    groomFullName: "Oluwatobiloba Adeyemi",
    shortNames: "Ada & Tobi",
    monogram: "A&T",
    hashtag: "#TobiFoundHisAda",
    tagline: "are getting married",
    introduction:
      "Seven years ago we were two strangers hiding from Lagos rain under the same awning. This December, surrounded by the people who prayed us here, we are making it forever — three days of Igbo tradition, Yoruba joy and far too much jollof.",
    heroPhoto: {
      src: "/images/hero-couple.jpg",
      alt: "Ada and Tobi standing forehead to forehead at golden hour",
      caption: "Ada & Tobi, Lekki, 2026",
    },
    portraitPhoto: {
      src: "/images/portrait-couple.jpg",
      alt: "Ada laughing with her head on Tobi's shoulder",
      caption: "The week we started planning",
    },
  },

  meta: {
    id: "wedding-2026",
    startsAt: "2026-12-11T11:00:00+01:00",
    displayDate: "11 & 12 December 2026",
    displayLocation: "Lagos, Nigeria",
    city: "Lagos",
    country: "Nigeria",
    timezone: "Africa/Lagos",
    rsvpDeadline: "2026-10-30T23:59:00+01:00",
    rsvpDeadlineDisplay: "Friday, 30 October 2026",
    siteUrl: "https://adaandtobi.love",
    shareMessage:
      "Ada & Tobi are getting married on 11 & 12 December 2026 in Lagos. Open your invitation here:",
    // Mixkit "Wedding Harp" by Francisco Alvear — free under mixkit.co/license/#musicFree
    musicTrack: {
      src: "/audio/first-dance.mp3",
      title: "Wedding Harp",
    },
  },

  events: [
    {
      id: "event-traditional",
      kind: "traditional",
      name: "Traditional Wedding",
      subtitle: "Igba Nkwu Nwanyi",
      description:
        "The wine-carrying ceremony, where Ada searches the crowd for her husband and the Nwachukwu family gives their blessing. Come ready to dance — the ọjà will not be gentle.",
      startsAt: "2026-12-11T11:00:00+01:00",
      endsAt: "2026-12-11T17:00:00+01:00",
      displayDate: "Friday, 11 December 2026",
      displayTime: "11:00 AM — 5:00 PM",
      venue: "The Grey Pavilion",
      address: "14 Oduduwa Crescent, Ikeja GRA, Lagos",
      mapsQuery: "The Grey Pavilion, 14 Oduduwa Crescent, Ikeja GRA, Lagos, Nigeria",
      dressCode: "Aso Ebi — deep forest & champagne gold",
      accentColor: "#1f3a32",
      photo: {
        src: "/images/event-traditional.jpg",
        alt: "Coral beads, a carved calabash and folded George fabric",
      },
      notes: [
        "Guests are seated by 10:30 AM — the procession starts on time.",
        "Palm wine, small chops and photographs from 10:00 AM.",
      ],
    },
    {
      id: "event-white",
      kind: "white",
      name: "White Wedding",
      subtitle: "The Church Ceremony",
      description:
        "A quiet, sacred hour. Vows, communion and the choir Ada has loved since she was nine years old.",
      startsAt: "2026-12-12T10:00:00+01:00",
      endsAt: "2026-12-12T12:00:00+01:00",
      displayDate: "Saturday, 12 December 2026",
      displayTime: "10:00 AM — 12:00 PM",
      venue: "Chapel of Christ Our Light",
      address: "42 Kingsway Road, Ikoyi, Lagos",
      mapsQuery: "Chapel of Christ Our Light, 42 Kingsway Road, Ikoyi, Lagos, Nigeria",
      dressCode: "Formal — champagne, ivory & muted gold",
      accentColor: "#b0894e",
      photo: {
        src: "/images/event-white.jpg",
        alt: "Sunlight falling across a chapel aisle lined with white flowers",
      },
      notes: [
        "Please arrive by 9:30 AM. Doors close at 9:55 AM.",
        "The ceremony is unplugged — our photographer will capture everything.",
      ],
    },
    {
      id: "event-reception",
      kind: "reception",
      name: "Reception",
      subtitle: "Dinner & Dancing",
      description:
        "Dinner, speeches that will run long, a first dance we have secretly rehearsed, and dancing until the DJ begs us to stop.",
      startsAt: "2026-12-12T14:00:00+01:00",
      endsAt: "2026-12-12T22:00:00+01:00",
      displayDate: "Saturday, 12 December 2026",
      displayTime: "2:00 PM — 10:00 PM",
      venue: "The Monarch Event Centre",
      address: "5 Ligali Ayorinde Street, Victoria Island, Lagos",
      mapsQuery: "The Monarch Event Centre, Ligali Ayorinde Street, Victoria Island, Lagos, Nigeria",
      dressCode: "Cocktail glamour — bring shoes you can dance in",
      accentColor: "#a85c3e",
      photo: {
        src: "/images/event-reception.jpg",
        alt: "Candlelit reception tables set with gold rimmed glassware",
      },
      notes: [
        "Cocktails from 2:00 PM, dinner served at 4:00 PM.",
        "Valet parking is available from 1:30 PM.",
      ],
    },
  ],

  story: [
    {
      id: "story-2019",
      year: "2019",
      title: "The First Meeting",
      location: "Bogobiri House, Ikoyi",
      body:
        "Tobi came for the poetry night. Ada came for the suya. A downpour trapped everyone under the veranda for two hours, and by the time the rain stopped he had her number written on the back of a receipt — which he still keeps in his wallet.",
      photo: {
        src: "/images/story-meeting.jpg",
        alt: "Warm lamplight on a Lagos veranda during heavy rain",
      },
    },
    {
      id: "story-2020",
      year: "2020",
      title: "The Friendship",
      location: "Two flats, eleven kilometres apart",
      body:
        "Lockdown turned into a year of 2 a.m. voice notes, badly cooked pasta over video call, and Ada quietly deciding she would be very annoyed if he ever fell in love with someone else.",
      photo: {
        src: "/images/story-friendship.jpg",
        alt: "A phone resting beside two cups of tea at night",
      },
    },
    {
      id: "story-2022",
      year: "2022",
      title: "The Falling",
      location: "Elegushi Beach, Lekki",
      body:
        "Their first real date lasted fourteen hours. Somewhere between the fish and the walk back along the water, Tobi said it first. Ada laughed, said \"finally\", and said it back.",
      photo: {
        src: "/images/story-falling.jpg",
        alt: "Two pairs of footprints along a Lagos beach at sunset",
      },
    },
    {
      id: "story-2023",
      year: "2023",
      title: "The Proposal",
      location: "Idanre Hills, Ondo State",
      body:
        "Six hundred and eighty steps up, at sunrise, Tobi pretended to be catching his breath. He knelt instead. Ada was crying before he finished the sentence, and their friend hiding behind a rock caught all of it on camera.",
      photo: {
        src: "/images/story-proposal.jpg",
        alt: "A proposal at sunrise on a hilltop overlooking green hills",
      },
    },
    {
      id: "story-2025",
      year: "2025",
      title: "The Introduction",
      location: "Enugu",
      body:
        "Kola nut, palm wine and two families who took roughly nine minutes to start arguing about whose jollof would be served. The answer, joyfully, was both.",
      photo: {
        src: "/images/story-introduction.jpg",
        alt: "Kola nut and palm wine arranged on an embroidered cloth",
      },
    },
    {
      id: "story-2026",
      year: "2026",
      title: "The Wedding",
      location: "Lagos",
      body:
        "Everything above led here. Two days, three ceremonies, and every single person who carried us — including you.",
      photo: {
        src: "/images/story-wedding.jpg",
        alt: "Ada and Tobi walking together, hands clasped",
      },
    },
  ],

  asoEbi: {
    id: "aso-ebi-2026",
    headline: "Be Part of the Celebration",
    intro:
      "Aso Ebi is how we recognise our people in a crowd — a family dressed in one cloth. Wearing it is entirely optional, and you are loved either way. But the photographs are going to be glorious.",
    deadline: "2026-10-15T23:59:00+01:00",
    deadlineDisplay: "Thursday, 15 October 2026",
    howToPurchase: [
      "Tap “Get Aso Ebi” and send the pre-filled WhatsApp message to Aunty Ngozi.",
      "Confirm your option, quantity and measurements — she will reply with payment details.",
      "Pay within 48 hours to hold your fabric; a receipt is issued immediately.",
      "Collect at the Ikeja pickup point from 20 November, or request delivery within Lagos.",
    ],
    coordinator: {
      id: "contact-asoebi",
      name: "Ngozi Nwachukwu",
      role: "Aso Ebi Coordinator",
      phone: "+234 803 214 7788",
      whatsapp: "2348032147788",
      email: "asoebi@adaandtobi.love",
    },
    options: [
      {
        id: "aso-ebi-ladies",
        name: "For the Ladies",
        fabric: "Intorica George with hand-beaded lace blouse",
        price: 85000,
        currency: "NGN",
        colorway: "Deep forest green & champagne gold",
        swatches: ["#1f3a32", "#33564b", "#d6bd8e"],
        includes: [
          "5 yards Intorica George wrapper",
          "2 yards beaded French lace for the blouse",
          "Matching gele (headwrap)",
          "Styling guide with three approved looks",
        ],
        photo: {
          src: "/images/asoebi-ladies.jpg",
          alt: "Deep green George fabric with gold beaded lace folded on ivory linen",
        },
        sizeNote: "One size — fabric is supplied uncut for your own tailor.",
      },
      {
        id: "aso-ebi-gents",
        name: "For the Gentlemen",
        fabric: "Premium Atiku guinea brocade with embroidered fila",
        price: 65000,
        currency: "NGN",
        colorway: "Warm ivory with forest embroidery",
        swatches: ["#f4ede1", "#ddcdb4", "#1f3a32"],
        includes: [
          "4 yards premium Atiku brocade",
          "Matching embroidered fila (cap)",
          "Choice of agbada or kaftan embroidery pattern",
          "Tailoring available at an additional ₦35,000",
        ],
        photo: {
          src: "/images/asoebi-gents.jpg",
          alt: "Ivory guinea brocade with green embroidery and a matching cap",
        },
        sizeNote: "Share your chest, shoulder and length measurements when ordering.",
      },
    ],
  },

  registry: {
    id: "registry-2026",
    headline: "Your Presence Is Our Greatest Gift",
    intro:
      "Truly — showing up is more than enough. But we have been asked so many times that we finally made a list. Everything here is optional, and nothing is expected.",
    note:
      "Gifts can also be brought on the day; there will be a gift table at the reception.",
    showBankDetails: false,
    bankAccounts: [
      {
        bankName: "Guaranty Trust Bank",
        accountName: "Adaeze Nwachukwu / Oluwatobiloba Adeyemi",
        accountNumber: "0123456789",
        currency: "NGN",
        note: "Please use your name as the transfer reference so we can thank you properly.",
      },
    ],
    items: [
      {
        id: "gift-dutch-oven",
        name: "The Sunday Stew Pot",
        category: "home",
        description:
          "A cast iron Dutch oven for the ofe akwu Tobi has promised to finally learn how to make.",
        amount: 185000,
        currency: "NGN",
        photo: { src: "/images/registry-home.jpg", alt: "A deep green cast iron Dutch oven" },
        url: "https://example.com/registry/dutch-oven",
      },
      {
        id: "gift-linens",
        name: "Everyday Linen Bedding",
        category: "home",
        description: "Stone-washed linen in oatmeal, because our first flat deserves softness.",
        amount: 120000,
        currency: "NGN",
        photo: { src: "/images/registry-linen.jpg", alt: "Folded oatmeal linen bedding" },
        url: "https://example.com/registry/linen",
      },
      {
        id: "gift-flights",
        name: "Two Seats to Zanzibar",
        category: "travel",
        description: "Contribute towards the flights for our honeymoon in January.",
        amount: 220000,
        currency: "NGN",
        photo: { src: "/images/registry-travel.jpg", alt: "Turquoise water and a wooden dhow boat" },
        isContribution: true,
      },
      {
        id: "gift-villa",
        name: "A Night by the Water",
        category: "travel",
        description: "Gift us one night of the beach house — sunrise swim included.",
        amount: 180000,
        currency: "NGN",
        photo: { src: "/images/registry-villa.jpg", alt: "A quiet beach house terrace at sunrise" },
        isContribution: true,
      },
      {
        id: "gift-cooking-class",
        name: "Stone Town Cooking Class",
        category: "experiences",
        description: "An afternoon learning to cook with cardamom, clove and far too much laughter.",
        amount: 75000,
        currency: "NGN",
        photo: { src: "/images/registry-experience.jpg", alt: "Spices arranged in small brass bowls" },
        isContribution: true,
      },
      {
        id: "gift-portrait",
        name: "Our First Portrait",
        category: "other",
        description:
          "A commissioned painting of the two of us, for the wall of whatever home we build.",
        amount: 250000,
        currency: "NGN",
        photo: { src: "/images/registry-portrait.jpg", alt: "A framed portrait on a warm plaster wall" },
        url: "https://example.com/registry/portrait",
      },
      {
        id: "gift-cash",
        name: "Bless Us As You Are Led",
        category: "cash",
        description:
          "No amount, no expectation. If you would prefer to give cash towards our first home, we receive it with both hands.",
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
        "Traditional wedding: Aso Ebi if you ordered it, otherwise Nigerian traditional attire in deep forest green, champagne or gold. White wedding and reception: formal wear in champagne, ivory and muted gold. Please leave full white for the bride.",
      link: { label: "See the dress code", href: "#dress-code" },
    },
    {
      id: "faq-venue",
      question: "Where exactly are the venues?",
      answer:
        "Everything happens in Lagos. The traditional wedding is at The Grey Pavilion in Ikeja GRA; the church service is at the Chapel of Christ Our Light in Ikoyi; the reception is at The Monarch Event Centre on Victoria Island. Every event card has a “Get Directions” button that opens your maps app.",
      link: { label: "View wedding details", href: "#wedding" },
    },
    {
      id: "faq-plus-one",
      question: "Can I bring a plus one?",
      answer:
        "Our invitation covers the names printed on it. If you were given a plus one, you can add them when you RSVP. We are working with a strict venue capacity, so please don't bring additional guests unaccounted for.",
    },
    {
      id: "faq-children",
      question: "Are children invited?",
      answer:
        "We adore your children. The traditional wedding is wonderfully child-friendly, but the church service and evening reception are adults-only from 6:00 PM. A supervised children's room is available at the reception venue until then.",
    },
    {
      id: "faq-rsvp-when",
      question: "When should I RSVP?",
      answer:
        "By Friday, 30 October 2026 please. Catering numbers are confirmed the following week, and late responses are genuinely difficult to accommodate.",
      link: { label: "RSVP now", href: "#rsvp" },
    },
    {
      id: "faq-aso-ebi",
      question: "Where can I get the Aso Ebi?",
      answer:
        "Tap “Get Aso Ebi” and you'll be taken straight to a WhatsApp chat with Aunty Ngozi, our coordinator. Orders close on 15 October 2026 — the fabric is imported and cannot be reordered after that.",
      link: { label: "Get Aso Ebi", href: "#aso-ebi" },
    },
    {
      id: "faq-parking",
      question: "Is there parking?",
      answer:
        "Yes. The Grey Pavilion has 120 free spaces, and The Monarch Event Centre offers valet parking from 1:30 PM. The chapel has limited parking, so we recommend ride-hailing to Ikoyi if you can.",
    },
    {
      id: "faq-gift",
      question: "Can I send a gift?",
      answer:
        "Your presence really is the gift. If you'd still like to give something, our registry has options from ₦75,000 upwards, plus a cash option if you prefer.",
      link: { label: "Visit the registry", href: "#registry" },
    },
    {
      id: "faq-arrival",
      question: "What time should I arrive?",
      answer:
        "Please treat these as the real times. Traditional wedding: seated by 10:30 AM. Church: seated by 9:30 AM, doors close at 9:55 AM. Reception: cocktails from 2:00 PM, dinner served promptly at 4:00 PM.",
    },
    {
      id: "faq-photos",
      question: "Can I share photos online?",
      answer:
        "Please do — tag everything #TobiFoundHisAda so we can find them. The only exception is the church ceremony, which is unplugged; phones away, hearts open.",
    },
  ],

  gallery: [
    { src: "/images/gallery-01.jpg", alt: "Ada and Tobi laughing during their engagement shoot", caption: "Engagement shoot — Lekki, March 2026" },
    { src: "/images/gallery-02.jpg", alt: "Close-up of clasped hands with the engagement ring", caption: "The ring, six hundred and eighty steps later" },
    { src: "/images/gallery-03.jpg", alt: "The couple dancing barefoot on a rooftop at dusk", caption: "Rooftop, Victoria Island" },
    { src: "/images/gallery-04.jpg", alt: "Portrait of Ada in a green wrapper and gele", caption: "Ada, before the introduction" },
    { src: "/images/gallery-05.jpg", alt: "Portrait of Tobi in an ivory agbada", caption: "Tobi, in his father's fila" },
    { src: "/images/gallery-06.jpg", alt: "The couple walking a Lagos street at golden hour", caption: "The long walk home" },
    { src: "/images/gallery-07.jpg", alt: "Behind the scenes with the photography crew", caption: "Behind the scenes" },
    { src: "/images/gallery-08.jpg", alt: "The couple sharing an umbrella in the rain", caption: "Where it all began — under the rain" },
  ],

  dressCode: [
    {
      id: "dress-traditional",
      eventName: "Traditional Wedding",
      title: "Forest & Gold",
      guidance:
        "Nigerian traditional attire. Ladies in George, lace or Ankara with a gele; gentlemen in agbada, kaftan or isiagu. Aso Ebi is welcome but never required.",
      palette: [
        { name: "Forest", hex: "#1f3a32" },
        { name: "Palm", hex: "#33564b" },
        { name: "Champagne", hex: "#d6bd8e" },
        { name: "Burnished Gold", hex: "#b0894e" },
      ],
      avoid: "Please avoid coral red — it is reserved for the bridal party.",
      photo: { src: "/images/dress-traditional.jpg", alt: "Forest green and gold traditional attire" },
    },
    {
      id: "dress-white",
      eventName: "White Wedding & Reception",
      title: "Champagne Formal",
      guidance:
        "Formal wear. Floor-length or midi dresses, tailored suits in charcoal, navy or ivory. Heels that survive a dance floor are a wise investment.",
      palette: [
        { name: "Ivory", hex: "#f4ede1" },
        { name: "Champagne", hex: "#eaddc7" },
        { name: "Sand", hex: "#ddcdb4" },
        { name: "Clay", hex: "#a85c3e" },
      ],
      avoid: "Please avoid full white or ivory head-to-toe — that one is Ada's.",
      photo: { src: "/images/dress-white.jpg", alt: "Champagne and ivory formal wedding attire" },
    },
  ],

  contacts: [
    {
      id: "contact-primary",
      name: "Chiamaka Obi",
      role: "Wedding Coordinator",
      phone: "+234 802 551 3390",
      whatsapp: "2348025513390",
      email: "hello@adaandtobi.love",
    },
    {
      id: "contact-asoebi-2",
      name: "Ngozi Nwachukwu",
      role: "Aso Ebi & Guest Support",
      phone: "+234 803 214 7788",
      whatsapp: "2348032147788",
      email: "asoebi@adaandtobi.love",
    },
  ],

  socials: [
    { id: "social-instagram", label: "Instagram", href: "https://instagram.com/explore/tags/tobifoundhisada" },
    { id: "social-hashtag", label: "#TobiFoundHisAda", href: "https://instagram.com/explore/tags/tobifoundhisada" },
  ],
};
