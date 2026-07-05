import type { CaseStudyContent } from './caseStudies'

export const CASE_STUDIES_SR: CaseStudyContent[] = [
  {
    slug: 'socks-co',
    name: 'Socks & Co.',
    accent: '#9181D6',
    tagline: 'E-trgovina · Brending · 2024',
    intro:
      'Pomogli smo brendu čarapa koji prodaje direktno potrošačima da pronađe svoj glas — izgradili smo razigrani identitet i prodavnicu visoke konverzije koja je svakodnevne osnove pretvorila u brend o kojem ljudi rado pričaju.',
    meta: [
      { label: 'Uloga', value: 'Identitet · Web · Razvoj' },
      { label: 'Vremenski okvir', value: '2024 · 8 nedelja' },
      { label: 'Usluge', value: 'Strategija, Dizajn, Razvoj' },
      { label: 'Platforma', value: 'Headless e-trgovina' },
    ],
    overview: {
      heading: 'Svakodnevne čarape,\noživljene.',
      paragraphs: [
        'Socks & Co. je imao odličan proizvod i nula prepoznatljivosti brenda. Stari sajt je izgledao kao svaki drugi Shopify šablon — a konverzija je patila.',
        'Izgradili smo sve ispočetka: prepoznatljiv identitet, prodavnicu osmišljenu za konverziju i limitiranu Nike kolaboraciju koja je lansiranje proizvoda pretvorila u događaj.',
      ],
    },
    challenge: {
      heading: 'Pretvoriti robu u brend\no kojem ljudi zaista pričaju.',
      body: 'Stari sajt je zakopao proizvod u generičke šablone, naplata je gubila prodaju, a brend nije imao ličnost oko koje bi se zajednica okupila. Naš zadatak bio je da sve tri stvari popravimo odjednom.',
    },
    approach: [
      {
        no: '01',
        title: 'Identitet sa ličnošću',
        body: 'Ručno crtani logotip, upečatljiva primarna paleta i ekspresivna tipografija koja brendu daju istu dozu zabave kao i sam proizvod.',
      },
      {
        no: '02',
        title: 'Prodavnica osmišljena za konverziju',
        body: 'Jasna hijerarhija proizvoda, lepljiva korpa, podsticaji za besplatnu dostavu i društveni dokaz — svaki ekran osmišljen da kupce vodi ka naplati.',
      },
      {
        no: '03',
        title: 'Nike kolaboracija — limitirano izdanje',
        body: 'Landing stranica limitiranog izdanja sa odbrojavanjem uživo i posebnom prodavnicom kolaboracije koja je lansiranje pretvorila u događaj.',
      },
      {
        no: '04',
        title: 'Naplata bez trenja',
        body: 'Trokoračan tok dostava → isporuka → plaćanje sa gostujućom naplatom i stalnim pregledom porudžbine koji drži napuštanje korpe na niskom nivou.',
      },
    ],
    gallery: [
      { src: '/socks-home.png', label: 'Početna stranica', alt: 'Socks & Co. početna stranica' },
      {
        src: '/socks-collab.png',
        label: 'Limitirano izdanje · Nike kolaboracija',
        alt: 'Socks & Co. x Nike prodavnica kolaboracije',
      },
      { src: '/socks-cart.png', label: 'Korpa i naplata', alt: 'Socks & Co. korpa i naplata' },
    ],
    gallerySiteUrl: 'socksandco.com',
    palette: [
      { name: 'Grape', hex: '#9181D6' },
      { name: 'Sunshine', hex: '#FFD23F' },
      { name: 'Blossom', hex: '#F4B7C7' },
      { name: 'Sky', hex: '#BFD9F2' },
      { name: 'Cream', hex: '#FBF4E6' },
      { name: 'Ink', hex: '#1B1B1F' },
    ],
    paletteHeading: 'Paleta sa ličnošću',
    results: {
      sectionLabel: 'Rezultati',
      heading: 'Brojke koje je tim\nponosno delio.',
      items: [
        { value: '+38%', label: 'Stopa konverzije' },
        { value: '2.1×', label: 'Prosečna vrednost porudžbine' },
        { value: '-45%', label: 'Stopa odbijanja' },
        { value: '4.9/5', label: 'Ocena kupaca' },
      ],
      quote: {
        text: 'Mark Studio nam je dao brend koji zaista želimo da pokažemo — a brojke su usledile. Najbolja odluka koju smo doneli ove godine.',
        attribution: 'Osnivač, Socks & Co.',
      },
    },
    coverImage: '/socks-home.png',
    ctaHeading: 'Imate brend o kojem vredi pričati?',
    ctaSubtext: 'Hajde da izgradimo iskustvo koje vas tamo vodi.',
  },
  {
    slug: 'fade-co',
    name: 'Fade & Co.',
    accent: '#C8923E',
    tagline: 'Berbernica · Brending · Web · 2026',
    intro:
      'Premium berbernici u Surreyju trebao je digitalni identitet oštar kao njihovi fadeovi. Izgradili smo scroll homepage demo koji oživljava od prvog kadra — i pretvara posetioce u rezervisane termine.',
    liveUrl: '/work-demos/fade-co/',
    meta: [
      { label: 'Uloga', value: 'Identitet · Web · Razvoj' },
      { label: 'Vremenski okvir', value: '2026 · 6 nedelja' },
      { label: 'Usluge', value: 'Strategija, Dizajn, Razvoj' },
      { label: 'Platforma', value: 'Prilagođen statički sajt' },
    ],
    overview: {
      heading: 'Oštri rezovi,\nprecizan digital.',
      paragraphs: [
        'Fade & Co. je imao zanat i klijentelu — ali online prisutnost nije odgovarala iskustvu u stolici. Generički šabloni i skriven tok rezervacije značili su da novi klijenti odlaze pre nego što vide rad.',
        'Osmislili smo početnu stranicu koja vodi pokretom: scroll-scrub hero koji vodi posetioce kroz šišanje, zatim cene, galeriju i formu za rezervaciju u jednom dahu.',
      ],
    },
    challenge: {
      heading: 'Lokalnu berbernicu učiniti\nnedvosmisleno premium.',
      body: 'Takmičenje cenom nije bila opcija — Fade & Co. pobeđuje preciznošću, atmosferom i doslednošću. Sajt je morao to da prenese za nekoliko sekundi i učini rezervaciju jednostavnom kao ulazak u salon.',
    },
    approach: [
      {
        no: '01',
        title: 'Brend koji deluje premium',
        body: 'Mesingani akcenti, Oswald display tipografija i tamna, topla paleta — Fade & Co. kao prvi izbor u Surreyju, ne još jedna berbernica.',
      },
      {
        no: '02',
        title: 'Scroll-scrub hero',
        body: 'Pinovan hero sa frejm-po-frejm animacijom koja prati skrol kroz šišanje — početna stranica kao filmski prvi utisak.',
      },
      {
        no: '03',
        title: 'Rezervacija koja konvertuje',
        body: 'Jasni paketi usluga, društveni dokaz i jednostavna forma za rezervaciju — za walk-in i online termine.',
      },
      {
        no: '04',
        title: 'Rad koji prodaje zanat',
        body: 'Bento galerija i zid utisaka gde fadeovi, linije i hot-towel završetci govore sami za sebe.',
      },
    ],
    gallery: [
      {
        src: '/work-demos/fade-co/hero-poster.jpg',
        label: 'Početna · scroll hero',
        alt: 'Fade & Co. hero početne stranice',
      },
      {
        src: '/work-demos/fade-co/img/shot-01.jpg',
        label: 'Radovi',
        alt: 'Fade & Co. galerija',
      },
      {
        src: '/work-demos/fade-co/img/shot-08.jpg',
        label: 'Rezervacija',
        alt: 'Fade & Co. sekcija za rezervaciju',
      },
    ],
    gallerySiteUrl: 'fadeandco.com',
    palette: [
      { name: 'Ink', hex: '#0C0B0A' },
      { name: 'Surface', hex: '#14110E' },
      { name: 'Brass', hex: '#C8923E' },
      { name: 'Gold', hex: '#DDA94E' },
      { name: 'Cream', hex: '#F4EFE7' },
      { name: 'Muted', hex: '#9B8F80' },
    ],
    paletteHeading: 'Topli tamni luksuz',
    results: {
      sectionLabel: 'Rezultati',
      heading: 'Brojke koje je tim\nponosno delio.',
      items: [
        { value: '+52%', label: 'Online rezervacije' },
        { value: '2.4×', label: 'Vreme na sajtu' },
        { value: '-38%', label: 'Stopa odlazaka' },
        { value: '4.9/5', label: 'Google ocena' },
      ],
      quote: {
        text: 'Scroll hero je zaustavljao ljude — rezervacije su skočile nedelju dana posle lansiranja. Konačno osećamo kao naš salon.',
        attribution: 'Vlasnik, Fade & Co.',
      },
    },
    coverImage: '/work-demos/fade-co/hero-poster.jpg',
    ctaHeading: 'Želite početnu stranicu koja se kreće?',
    ctaSubtext: 'Hajde da izgradimo scroll iskustvo koje vaš brend zaslužuje.',
  },
  {
    slug: 'novaframe',
    name: 'NovaFrame',
    accent: '#B79268',
    tagline: 'Svadbeni film · Web · 2025',
    intro:
      'NovaFrame FVS je vizija Dušana Jovanovića — beogradskog studija za svadbene filmove koji hvata ljubavne priče širom Evrope i sveta. Izgradili smo portfolio sajt jednako filmski i vanvremenski kao njihovi filmovi.',
    liveUrl: 'https://novaframefvs.com/',
    meta: [
      { label: 'Uloga', value: 'Web dizajn · Razvoj' },
      { label: 'Klijent', value: 'NovaFrame FVS' },
      { label: 'Usluge', value: 'Umetničko vođenje, Web, Motion' },
      { label: 'Lokacija', value: 'Beograd, Srbija' },
    ],
    overview: {
      heading: 'Sajt jednako filmski\nkao i filmovi.',
      paragraphs: [
        'NovaFrame snima u dokumentarnom stilu sa filmskim pečatom — pravi, iskreni trenuci, lepo kadrirani. Stara online prisutnost nije odražavala kvalitet rada, a parovima je trebao jasniji put do rezervacije.',
        'Osmislili smo mračan, filmski interfejs koji stavlja filmove na prvo mesto, priča priču svakog para i vodi posetioce ka ponudi — sve dok deluje lako i vanvremenski.',
      ],
    },
    challenge: {
      heading: 'Učiniti filmove glavnim junacima —\ni pretvoriti gledaoce u parove.',
      body: 'Svadbeni filmovi su emotivni i uronjajući, ali sajt ih može spljoštiti. Sajt je morao da sačuva taj filmski osećaj, izgradi trenutno poverenje i učini rezervaciju jednostavnom za parove koji planiraju mesecima unapred.',
    },
    approach: [
      {
        no: '01',
        title: 'Filmsko umetničko vođenje',
        body: 'Film preko celog ekrana, suzdržana tipografija i topla, filmska paleta — sajt koji deluje jednako filmski kao rad koji predstavlja.',
      },
      {
        no: '02',
        title: 'Portfolio u kojem priča vodi',
        body: 'Svaki par dobija sopstveno poglavlje, pa prave ljubavne priče vode iskustvo.',
      },
      {
        no: '03',
        title: 'Jednostavan tok za ponudu',
        body: 'Jasan put „Zatražite ponudu" pretvara inspirisane posetioce u rezervisane parove, sa paketima i procesom objašnjenim unapred.',
      },
      {
        no: '04',
        title: 'Odgovori koji grade poverenje',
        body: 'Pažljivo osmišljen FAQ pokriva stil, rokove isporuke i putovanja — uklanjajući sumnju pre nego što parovi uopšte stupaju u kontakt.',
      },
    ],
    gallery: [
      { src: '/nova-hero.png', label: 'Početna stranica', alt: 'NovaFrame hero početne stranice' },
      {
        src: '/nova-couples.jpg',
        label: 'Portfolio parova',
        alt: 'NovaFrame portfolio parova',
      },
    ],
    gallerySiteUrl: 'novaframefvs.com',
    galleryVimeoId: '1204433136',
    palette: [
      { name: 'Ink', hex: '#15110D' },
      { name: 'Charcoal', hex: '#221C16' },
      { name: 'Gold', hex: '#B79268' },
      { name: 'Taupe', hex: '#8C7F6E' },
      { name: 'Cream', hex: '#EFE7DA' },
    ],
    paletteHeading: 'Topla, filmska paleta',
    results: {
      sectionLabel: 'U brojkama',
      heading: 'Šta parovi mogu\nda očekuju.',
      items: [
        { value: '4–6 min', label: 'Filmski highlight film' },
        { value: '40–90 min', label: 'Dokumentarni film' },
        { value: '2,000', label: 'Obradjenih fotografija (do)' },
        { value: '8–10 ned.', label: 'Isporuka filma' },
      ],
      quote: {
        text: 'Svaka priča, svaka emocija, filmski uhvaćena.',
        attribution: 'NovaFrame FVS',
        serif: true,
      },
    },
    coverImage: '/nova-hero.png',
    coverVimeoId: '1204433136',
    ctaHeading: 'Imate priču vrednu ispričavanja?',
    ctaSubtext: 'Hajde da izgradimo iskustvo koje je oživljava.',
  },
  {
    slug: 'kosmaj-zomes',
    name: 'Kosmaj Zomes',
    accent: '#2F4F3E',
    tagline: 'Ugostiteljstvo · Web · 2025',
    intro:
      'Kosmaj Zomes nudi luksuzne geodomske kupole na planini Kosmaj — savršen beg u srcu prirode. Osmislili smo sajt jednako miran i gostoljubiv kao sam boravak.',
    meta: [
      { label: 'Uloga', value: 'Web dizajn · Razvoj' },
      { label: 'Klijent', value: 'Kosmaj Zomes' },
      { label: 'Usluge', value: 'Dizajn, Razvoj' },
      { label: 'Lokacija', value: 'Kosmaj, Srbija' },
    ],
    overview: {
      heading: 'Ugostiteljstvo\nu službi prirode.',
      paragraphs: [
        'Geodomske kupole na planini zaslužuju digitalno iskustvo koje deluje jednako posebno — toplo, mirno i nedvosmisleno premium.',
        'Izgradili smo sajt koji vodi fotografijom, ističe Airbnb društveni dokaz i čini proveru dostupnosti jednostavnom.',
      ],
    },
    challenge: {
      heading: 'Prodati osećaj bega\npre nego što gosti stignu.',
      body: 'Putnici prvo rezervišu očima. Sajt je morao da za nekoliko sekundi prenese luksuz, prirodu i udobnost — zatim da goste glatko vodi od inspiracije do rezervacije.',
    },
    approach: [
      {
        no: '01',
        title: 'Zemljana, elegantna paleta',
        body: 'Duboke šumske zelene, topli breskva akcenti i krem tipografija stvaraju mirnu, premium atmosferu koja odražava same kupole.',
      },
      {
        no: '02',
        title: 'Priča vođena galerijom',
        body: 'Bogata foto galerija i istaknuti sadržaji omogućavaju gostima da istraže iskustvo — džakuzi, pogled na planinu, kuhinja i još mnogo toga — pre rezervacije.',
      },
      {
        no: '03',
        title: 'Poverenje kroz recenzije',
        body: 'Airbnb ocene i utisci gostiju protkani su kroz celu stranicu da grade sigurnost pri svakom skrolu.',
      },
      {
        no: '04',
        title: 'Jednostavna rezervacija',
        body: 'Ugrađena forma za dostupnost sa jasnim poljima za datum i broj gostiju pretvara pregledanje u rezervaciju u samo nekoliko dodira.',
      },
    ],
    gallery: [
      {
        src: '/kosmaj-zomes-home.png',
        label: 'Kompletno iskustvo sajta',
        alt: 'Kosmaj Zomes veb sajt',
      },
    ],
    gallerySiteUrl: 'kosmajzomes.rs',
    palette: [
      { name: 'Forest', hex: '#2F4F3E' },
      { name: 'Moss', hex: '#3D5C4A' },
      { name: 'Peach', hex: '#E8A87C' },
      { name: 'Cream', hex: '#F5F0E8' },
      { name: 'Sage', hex: '#8BA888' },
    ],
    paletteHeading: 'Zemljana, gostoljubiva paleta',
    results: {
      sectionLabel: 'Istaknuto',
      heading: 'Ono što gosti\nnajviše vole.',
      items: [
        { value: '5★', label: 'Airbnb ocena' },
        { value: '6', label: 'Premium sadržaji' },
        { value: '24/7', label: 'Pristup prirodi' },
        { value: '1-klik', label: 'Provera dostupnosti' },
      ],
      quote: {
        text: 'Nema mesta kao Kosmaj Zomes — sajt konačno hvata taj osećaj.',
        attribution: 'Kosmaj Zomes',
      },
    },
    coverImage: '/kosmaj-zomes-home.png',
    ctaHeading: 'Spremni da dočekate više gostiju?',
    ctaSubtext: 'Hajde da osmislimo iskustvo koje popunjava vaš kalendar.',
  },
  {
    slug: 'deluks-padel',
    name: 'Deluks Padel',
    accent: '#B8F55A',
    tagline: 'Sport · Web · 2025',
    intro:
      'Deluks Padel Centar je dom padela u Obrenovcu — profesionalni tereni, noćno osvetljenje i rastuća zajednica igrača. Izgradili smo sajt sa istom energijom kao i sam sport.',
    meta: [
      { label: 'Uloga', value: 'Web dizajn · Razvoj' },
      { label: 'Klijent', value: 'Deluks Padel Centar' },
      { label: 'Usluge', value: 'Dizajn, Razvoj' },
      { label: 'Lokacija', value: 'Obrenovac, Srbija' },
    ],
    overview: {
      heading: 'Sport susreće\nnoćnu energiju.',
      paragraphs: [
        'Padel je brz, društven i zarazan — sajt je morao da deluje isto. Tamne pozadine, neon akcenti i upečatljiva fotografija postavljaju ton od prvog skrola.',
        'Strukturirali smo iskustvo oko rezervacije terena, društvenog dokaza i priče iza centra — pretvarajući povremene posetioce u redovne igrače.',
      ],
    },
    challenge: {
      heading: 'Popuniti terene i izgraditi\nlokalnu sportsku zajednicu.',
      body: 'Novi sportski objekat treba više od rasporeda — treba mu atmosfera, kredibilitet i jednostavan put do rezervacije terena. Svaka sekcija morala je da podstiče akciju.',
    },
    approach: [
      {
        no: '01',
        title: 'Umetničko vođenje visokog kontrasta',
        body: 'Tamna podloga sa neon zelenim akcentima odražava terene noću — energično, moderno i nemoguće za ignorisanje.',
      },
      {
        no: '02',
        title: 'Društveni dokaz na prvom mestu',
        body: 'Broj igrača, odigrani sati i zvezdane ocene grade trenutno poverenje pre nego što posetioci stignu do rezervacije.',
      },
      {
        no: '03',
        title: 'Priča i lokacija',
        body: 'Masonry galerija i ugrađena mapa povezuju sport sa mestom — Obrenovac kao oaza za rekreaciju.',
      },
      {
        no: '04',
        title: 'UX usmeren na rezervaciju',
        body: 'Stalni CTA „Rezervišite" i jasna mreža sadržaja vode igrače direktno do rezervacije terena.',
      },
    ],
    gallery: [
      {
        src: '/deluks-padel-home.png',
        label: 'Početna stranica i ključne sekcije',
        alt: 'Deluks Padel Centar veb sajt',
      },
    ],
    gallerySiteUrl: 'delukspadel.rs',
    palette: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Carbon', hex: '#1A1A1A' },
      { name: 'Neon', hex: '#B8F55A' },
      { name: 'Court', hex: '#1E4D8C' },
      { name: 'White', hex: '#F5F5F5' },
    ],
    paletteHeading: 'Upečatljiva, atletska paleta',
    results: {
      sectionLabel: 'U brojkama',
      heading: 'Rastuća\nzajednica.',
      items: [
        { value: '200+', label: 'Aktivnih igrača' },
        { value: '300+', label: 'Odigranih sati' },
        { value: '4.9★', label: 'Prosečna ocena' },
        { value: '100%', label: 'Zadovoljstvo' },
      ],
      quote: {
        text: 'Doživite padel u Obrenovcu — sajt oživljava to obećanje.',
        attribution: 'Deluks Padel Centar',
      },
    },
    coverImage: '/deluks-padel-home.png',
    ctaHeading: 'Gradite sportski brend?',
    ctaSubtext: 'Hajde da kreiramo digitalni dom koji vaša zajednica zaslužuje.',
  },
  {
    slug: 'mm-studio',
    name: 'MM Studio',
    accent: '#C4A574',
    tagline: 'Arhitektura · Web · 2025',
    intro:
      'MM Studio je beogradska arhitektonska i enterijerska praksa koja oblikuje stambene i komercijalne prostore širom Srbije. Izgradili smo portfolio sajt jednako rafiniran i samouveren kao njihov rad.',
    meta: [
      { label: 'Uloga', value: 'Web dizajn · Razvoj' },
      { label: 'Klijent', value: 'MM Studio' },
      { label: 'Usluge', value: 'Umetničko vođenje, Web' },
      { label: 'Lokacija', value: 'Beograd, Srbija' },
    ],
    overview: {
      heading: 'Arhitektura koja\ngovori sama za sebe.',
      paragraphs: [
        'Velika arhitektura treba prostora da diše. Osmislili smo mračan, minimalistički interfejs koji fotografije projekata i detalje studija slučaja ostavlja da govore.',
        'Od istaknutih rezidencija do komercijalnih objekata, svaki projekat dobija prostor da zablista — sa jasnim putevima ka celokupnom portfoliju i kontaktu.',
      ],
    },
    challenge: {
      heading: 'Predstaviti složan rad\nbez preopterećenja posetilaca.',
      body: 'Arhitektonski portfoliji su na tankoj granici — premalo detalja i projekti deluju generički; previše i iskustvo postaje zagušeno. Sajt je morao da deluje kurirano i bez napora.',
    },
    approach: [
      {
        no: '01',
        title: 'Mračan raspored vođen galerijom',
        body: 'Skoro crna podloga i velikodušan beli prostor omogućavaju da projektne fotografije visoke rezolucije zauzmu pažnju.',
      },
      {
        no: '02',
        title: 'Priča o projektima',
        body: 'Istaknuti studiji slučaja — J House, Queens Residence i drugi — uparuju hero fotografije sa lokacijom, obimom i godinom na prvi pogled.',
      },
      {
        no: '03',
        title: 'Masonry mreža portfolija',
        body: 'Nepravilna mreža projekata odražava raznolikost rada kroz arhitekturu, enterijere i eksterijere.',
      },
      {
        no: '04',
        title: 'Kontakt bez napora',
        body: 'Čista forma za upit i skrolujući marquee čine studio pristupačnim bez narušavanja rafiniranog tona.',
      },
    ],
    gallery: [
      {
        src: '/mm-studio-home.png',
        label: 'Kompletno iskustvo sajta',
        alt: 'MM Studio veb sajt',
      },
    ],
    gallerySiteUrl: 'mmstudio.rs',
    palette: [
      { name: 'Ink', hex: '#0D0D0D' },
      { name: 'Charcoal', hex: '#2A2A2A' },
      { name: 'Stone', hex: '#6B6B6B' },
      { name: 'Gold', hex: '#C4A574' },
      { name: 'White', hex: '#F0F0F0' },
    ],
    paletteHeading: 'Rafinirana, monohromatska paleta',
    results: {
      sectionLabel: 'Obim',
      heading: 'Šta studio\nisporučuje.',
      items: [
        { value: '450m²', label: 'Najveća rezidencija' },
        { value: '3', label: 'Discipline' },
        { value: '12+', label: 'Istaknutih projekata' },
        { value: '2022+', label: 'Aktivan od' },
      ],
      quote: {
        text: 'Arhitektura i enterijeri — uhvaćeni sa suzdržanošću koju rad zaslužuje.',
        attribution: 'MM Studio',
        serif: true,
      },
    },
    coverImage: '/mm-studio-home.png',
    ctaHeading: 'Imate rad vredan predstavljanja?',
    ctaSubtext: 'Hajde da izgradimo portfolio koje vam donosi sledećeg klijenta.',
  },
]
