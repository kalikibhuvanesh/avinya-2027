'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const videoSources = [
  'https://raw.githubusercontent.com/kalikibhuvanesh/avinya-2027/main/day1-desert-arrival.mp4',
  'https://raw.githubusercontent.com/kalikibhuvanesh/avinya-2027/main/Desert%20video.mp4',
  'https://raw.githubusercontent.com/kalikibhuvanesh/avinya-2027/main/day2-cyberpunk-arrival.mp4.mp4',
  'https://raw.githubusercontent.com/kalikibhuvanesh/avinya-2027/main/Cyberpunk%20video.mp4',
  'https://raw.githubusercontent.com/kalikibhuvanesh/avinya-2027/main/day3-carnival-arrival.mp4.mp4',
  'https://raw.githubusercontent.com/kalikibhuvanesh/avinya-2027/main/Carnival%20video.mp4',
];

const transitions = [
  [0.27, 0.31],
  [0.42, 0.46],
  [0.57, 0.61],
  [0.72, 0.76],
  [0.87, 0.91],
];

type EventItem = {
  name: string;
  club: string;
  description: string;
  venue: string;
  time: string;
  category: string;
};

const day1Events: EventItem[] = [
  {
    name: 'Photography Contest',
    club: 'Iridescence',
    description:
      'Participants capture creative photographs based on a surprise fest theme.',
    venue: 'Pi Block (backside)',
    time: '10 AM – 12 PM',
    category: 'Creative',
  },
  {
    name: 'Code Royale',
    club: 'Return 0, OS Code, MSA',
    description:
      'A fast-paced 3v3 competitive programming showdown featuring a qualification round followed by a relay-style knockout. Every accepted submission forces a coder switch.',
    venue: '260 seater',
    time: '10 AM – 2 PM',
    category: 'Technical',
  },
  {
    name: 'Drama Competition',
    club: 'Limelight',
    description:
      'Inter-college theatrical performances judged on acting, storytelling, and stage presence.',
    venue: '260 seater',
    time: '11 AM – 1 PM',
    category: 'Cultural',
  },
  {
    name: 'AI Arcade',
    club: 'AccelAIrate, IEEE',
    description:
      'A two-stage AI challenge featuring visual reverse-prompting, logical constraint bypass, and a time-bound RAG treasure hunt.',
    venue: '260 seater',
    time: '11 AM – 5 PM',
    category: 'Technical',
  },
  {
    name: 'Monopoly',
    club: 'Inquizitive, ECell, QFis',
    description:
      'A stock-market simulation where teams invest in eight companies through twelve market rounds. Buy, sell, or hold based on news and market updates.',
    venue: 'Incubation Hall',
    time: '2 PM – 6 PM',
    category: 'Gaming',
  },
  {
    name: 'Music Competition',
    club: '440 hz',
    description:
      'Solo and band performances across multiple genres, evaluated by a panel of judges.',
    venue: '120 seater',
    time: '2 PM – 5 PM',
    category: 'Cultural',
  },
  {
    name: 'Just A Minute (JAM)',
    club: 'Zeitgeist',
    description:
      'A fast-paced speaking competition where participants speak on random topics for one minute.',
    venue: '120 seater',
    time: '2 PM – 5 PM',
    category: 'Cultural',
  },
  {
    name: 'Treasure Hunt',
    club: 'Zeitgeist',
    description:
      'Teams solve clues and complete challenges across campus to discover hidden treasures.',
    venue: 'Entire Campus',
    time: '3 PM – 5 PM',
    category: 'Gaming',
  },
  {
    name: 'Opening Ceremony & Cultural Night',
    club: 'Mosaic',
    description:
      'Official inauguration followed by guest performances, student showcases, and an evening celebration.',
    venue: 'Front gate E Block',
    time: '6 PM – 9 PM',
    category: 'Cultural',
  },
];

const day2Events: EventItem[] = [
  {
    name: 'Solo and Duet Dance',
    club: 'Dynamight',
    description:
      'Participants showcase choreography in solo and duet categories across diverse dance styles.',
    venue: 'M Block',
    time: '10 AM – 1 PM',
    category: 'Cultural',
  },
  {
    name: 'Mega Rush 2.0',
    club: 'Techniosys',
    description:
      'A competitive gaming event bringing together gamers from across the campus and beyond.',
    venue: 'Multiple labs and halls',
    time: '10 AM – 6 PM',
    category: 'Gaming',
  },
  {
    name: 'Stand-Up Comedy',
    club: 'Artist',
    description:
      'A comedy showcase featuring original acts, observational humour, and crowd interaction.',
    venue: 'Ground',
    time: '11 AM – 12:30 PM',
    category: 'Cultural',
  },
  {
    name: 'Debate Competition',
    club: 'Zeitgeist',
    description:
      'Teams debate contemporary topics, demonstrating research, logical reasoning, and persuasive speaking.',
    venue: '240 seater',
    time: '2 PM – 5 PM',
    category: 'Cultural',
  },
  {
    name: 'Tote Bag Painting',
    club: 'Mosaic',
    description:
      'A creative tote bag painting competition open to all participants.',
    venue: '2 × 120 seaters',
    time: '2 PM – 5 PM',
    category: 'Creative',
  },
  {
    name: 'Yukti 2.0',
    club: 'GND_0, IRIS, QC',
    description:
      'A six-hour hackathon where participants design a hardware module to generate QFT gate sequences, connect it with Qiskit, and execute circuits on real IBM Quantum hardware.',
    venue: '260 seater / Incubation Hall',
    time: '9 AM – 5 PM',
    category: 'Technical',
  },
  {
    name: 'Build with Gemma: Agentic Edition',
    club: 'GDG, Velocity, DSAI Society',
    description:
      'A six-hour agentic AI competition powered by Google Gemma. Teams build autonomous AI agents to solve evolving real-world challenges.',
    venue: '260 seater halls',
    time: '10 AM – 5 PM',
    category: 'Technical',
  },
  {
    name: 'Group Dance Competition',
    club: 'Dynamight',
    description:
      'College teams compete with coordinated group performances, judged on synchronization and creativity.',
    venue: 'Main Ground',
    time: '3 PM – 6 PM',
    category: 'Cultural',
  },
  {
    name: 'Battle of Bands',
    club: '440 hz',
    description:
      'College bands compete in a live musical showdown featuring original compositions and covers.',
    venue: 'Main Ground',
    time: '6:30 PM – 9 PM',
    category: 'Cultural',
  },
];

const day3Events: EventItem[] = [
  {
    name: 'Quiz Quest',
    club: 'Inquizitive',
    description:
      'A multi-round general knowledge and technology quiz for teams from participating colleges.',
    venue: '120 seater',
    time: '10 AM – 12 PM',
    category: 'Gaming',
  },
  {
    name: 'Kernel Panic',
    club: 'OS Code, Velocity',
    description:
      'Grand Linux Festival featuring a Linux users meetup, rice showcase, and a mini hackathon with problem statements related to solving issues and adding features to Linux.',
    venue: '120 seater',
    time: '10 AM – 5 PM',
    category: 'Technical',
  },
  {
    name: 'Street Play Competition',
    club: 'Limelight',
    description:
      'Teams perform socially relevant street plays emphasizing awareness, creativity, and audience engagement.',
    venue: 'Main Ground',
    time: '11 AM – 1 PM',
    category: 'Cultural',
  },
  {
    name: 'Fashion Show',
    club: 'InMotion',
    description:
      'A themed runway event showcasing student-designed outfits, styling, and team creativity.',
    venue: 'Main Ground',
    time: '3 PM – 5:30 PM',
    category: 'Cultural',
  },
  {
    name: 'Closing Ceremony & Prize Distribution',
    club: 'All Techno-Cultural Clubs',
    description:
      'The final celebration recognizing winners, announcing results, and concluding the three-day fest.',
    venue: 'Main Ground',
    time: '7:30 PM – 9 PM',
    category: 'Cultural',
  },
  {
    name: 'DJ',
    club: 'Artist',
    description: 'The final musical celebration of the festival.',
    venue: 'Main Ground',
    time: '9 PM – 11 PM',
    category: 'Cultural',
  },
];

const islandData = [
  {
    day: 'DAY 01',
    date: '12 MARCH 2027',
    title: 'THE LAST OUTPOST',
    subtitle:
      'Beyond the horizon lies a world of endless dunes, hidden stories and untold adventures.',
    label: 'DESERT TERRITORY',
    events: day1Events,
    accent: 'amber',
  },
  {
    day: 'DAY 02',
    date: '13 MARCH 2027',
    title: 'THE PANDEMONIUM',
    subtitle:
      'Enter a neon-soaked world where technology, music and chaos collide.',
    label: 'NEON DISTRICT',
    events: day2Events,
    accent: 'cyan',
  },
  {
    day: 'DAY 03',
    date: '14 MARCH 2027',
    title: 'THE CARNIVAL ISLAND',
    subtitle:
      'The final destination. A celebration of creativity, culture and unforgettable moments.',
    label: 'THE GRAND FINALE',
    events: day3Events,
    accent: 'pink',
  },
];

function OpeningScreen({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  const updateProgress = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    setProgress(
      Math.min(100, Math.max(0, (video.currentTime / video.duration) * 100))
    );
  };

  return (
    <section className="fixed inset-0 z-[100] h-[100dvh] w-full overflow-hidden bg-black text-white">
      <video
        ref={videoRef}
        src="https://raw.githubusercontent.com/kalikibhuvanesh/avinya-2027/main/ship-departure.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setLoading(false)}
        onPlaying={() => setLoading(false)}
        onTimeUpdate={updateProgress}
        onDurationChange={updateProgress}
        onEnded={onComplete}
        onError={() => {
          setLoading(false);
          setFailed(true);
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

      {/* AVINYA title reveal over the opening ship-departure video. */}
      <style>{`
        @keyframes avinyaTitleReveal {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .avinya-title-reveal { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 py-24 text-center sm:px-6">
        <div
          className="avinya-title-reveal w-full max-w-5xl"
          style={{ animation: 'avinyaTitleReveal 1.4s ease-out 0.35s both' }}
        >
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/80 sm:mb-3 sm:text-xs sm:tracking-[0.4em] md:tracking-[0.55em]">
            IIIT Dharwad presents
          </p>
          <h1 className="whitespace-nowrap text-[clamp(1.85rem,8vw,6rem)] font-black leading-none tracking-[0.06em] text-white drop-shadow-2xl sm:tracking-[0.12em] md:tracking-[0.16em]">
            AVINYA <span className="text-amber-200">2027</span>
          </h1>
          <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90 drop-shadow-lg sm:mt-4 sm:text-sm sm:tracking-[0.28em] md:text-base">
            Beyond the horizon
          </p>
          <p className="mx-auto mt-2 max-w-[19rem] text-[8px] leading-relaxed tracking-[0.12em] text-white/75 sm:max-w-none sm:text-[10px] sm:tracking-[0.18em]">
            THREE ISLANDS. ONE JOURNEY. ENDLESS POSSIBILITIES.
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 left-4 right-4 z-20 sm:bottom-8 sm:left-6 sm:right-6 md:bottom-12 md:left-16 md:right-16">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/75 sm:mb-3 sm:text-[9px] sm:tracking-[0.25em] md:text-[10px] md:tracking-[0.3em]">
          <span>AVINYA 2027</span>
          <span className="text-right">
            {loading
              ? 'PREPARING THE VOYAGE'
              : failed
              ? 'VIDEO UNAVAILABLE'
              : 'THE VOYAGE BEGINS'}
          </span>
        </div>

        <div className="h-[2px] w-full overflow-hidden bg-white/30">
          <div
            className="h-full bg-white"
            style={{ width: `${progress}%`, transition: 'width 150ms linear' }}
          />
        </div>

        {failed && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-white/75">
              The opening video could not be loaded.
            </p>
            <button
              type="button"
              onClick={onComplete}
              className="border border-white/60 bg-black/30 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            >
              Enter Avinya
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function EventCard({
  event,
  index,
  accent,
}: {
  event: EventItem;
  index: number;
  accent: string;
}) {
  const accentText =
    accent === 'amber'
      ? 'text-amber-200'
      : accent === 'cyan'
      ? 'text-cyan-200'
      : 'text-pink-200';

  return (
    <details className="group rounded-xl border border-white/15 bg-black/35 p-4 backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-black/50">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`mb-2 text-[10px] font-bold tracking-[0.2em] ${accentText}`}
          >
            EVENT {String(index + 1).padStart(2, '0')} ·{' '}
            {event.category.toUpperCase()}
          </p>

          <h3 className="text-base font-bold leading-snug text-white md:text-lg">
            {event.name}
          </h3>

          <p className="mt-2 text-xs text-white/55">{event.club}</p>

          <p className="mt-3 text-xs font-medium text-white/80">{event.time}</p>
        </div>

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/30 text-lg text-white transition group-open:rotate-45">
          +
        </span>
      </summary>

      <div className="mt-4 border-t border-white/15 pt-4">
        <p className="text-sm leading-6 text-white/70">{event.description}</p>

        <div className="mt-4">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/40">
            VENUE
          </p>
          <p className="mt-1 text-sm text-white/85">{event.venue}</p>
        </div>
      </div>
    </details>
  );
}

function IslandOverlay({ island }: { island: (typeof islandData)[number] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    ...Array.from(new Set(island.events.map((event) => event.category))),
  ];

  const filteredEvents =
    activeCategory === 'All'
      ? island.events
      : island.events.filter((event) => event.category === activeCategory);

  const accentText =
    island.accent === 'amber'
      ? 'text-amber-200'
      : island.accent === 'cyan'
      ? 'text-cyan-200'
      : 'text-pink-200';

  const accentBorder =
    island.accent === 'amber'
      ? 'border-amber-200/60'
      : island.accent === 'cyan'
      ? 'border-cyan-200/60'
      : 'border-pink-200/60';

  return (
    <div className="relative z-20 flex h-full w-full flex-col overflow-y-auto bg-gradient-to-b from-black/35 via-black/15 to-black/45 px-5 pb-12 pt-6 text-white md:px-12 md:pt-8">
      {/* Island navigation / branding */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/20 pb-4">
        <a href="#" className="text-xl font-black tracking-[0.25em]">
          AVINYA<span className={accentText}>.</span>
        </a>

        <p className="hidden text-xs tracking-[0.3em] text-white/65 sm:block">
          THE VOYAGE · IIIT DHARWAD
        </p>

        <a
          href="#hack2future"
          className="text-xs font-semibold tracking-widest text-white/80 transition hover:text-white"
        >
          HACK2FUTURE ↗
        </a>
      </div>

      {/* Island title */}
      <div className="mx-auto w-full max-w-7xl py-5 md:py-7">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`border-l-2 pl-3 text-xs font-bold tracking-[0.3em] ${accentBorder} ${accentText}`}
          >
            {island.day}
          </span>
          <span className="text-xs tracking-[0.25em] text-white/60">
            {island.date}
          </span>
        </div>

        <p
          className={`mt-3 text-[9px] font-bold tracking-[0.35em] ${accentText}`}
        >
          {island.label}
        </p>

        <h1 className="mt-2 max-w-5xl text-3xl font-black leading-none tracking-tight drop-shadow-lg md:text-5xl lg:text-6xl">
          {island.title}
        </h1>

        <p className="mt-3 max-w-xl text-xs leading-5 text-white/85 drop-shadow-md md:text-sm">
          {island.subtitle}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] text-white/75">
          <span>{String(island.events.length).padStart(2, '0')} EVENTS</span>
          <span className="h-1 w-1 rounded-full bg-white/50" />
          <span>EXPLORE THE LINEUP</span>
        </div>
      </div>

      {/* Category filters */}
      <div className="mx-auto mb-6 flex w-full max-w-7xl flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              activeCategory === category
                ? 'border-white bg-white text-black'
                : 'border-white/30 bg-black/20 text-white/75 hover:border-white/70 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Event grid */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 pb-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.name}
            event={event}
            index={island.events.indexOf(event)}
            accent={island.accent}
          />
        ))}
      </div>

      <div className="mx-auto mt-3 w-full max-w-7xl border-t border-white/20 pt-5">
        <p className="text-[10px] tracking-[0.3em] text-white/50">
          AVINYA 2027 · THREE DAYS. THREE WORLDS. ONE VOYAGE.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const voyageSection = useRef<HTMLElement>(null);
  const voyageTrigger = useRef<ScrollTrigger | null>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrivalRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!introFinished) return;

    gsap.registerPlugin(ScrollTrigger);

    const videos = videoRefs.current.slice(
      0,
      videoSources.length
    ) as HTMLVideoElement[];

    if (
      videos.length !== videoSources.length ||
      videos.some((video) => !video)
    ) {
      return;
    }

    videos.forEach((video, index) => {
      video.currentTime = 0;
      video.pause();
      gsap.set(video, { opacity: index === 0 ? 1 : 0 });
    });

    // Island overlays appear over the Day 1, Day 2 and Day 3 island videos.
    const overlayRanges = [
      [0.31, 0.42],
      [0.61, 0.72],
      [0.91, 1],
    ];

    overlayRefs.current.forEach((overlay) => {
      if (overlay) gsap.set(overlay, { opacity: 0, pointerEvents: 'none' });
    });
    arrivalRefs.current.forEach((overlay) => {
      if (overlay) gsap.set(overlay, { opacity: 0, pointerEvents: 'none' });
    });

    videos[0].play().catch(() => {});

    const ctx = gsap.context(() => {
      voyageTrigger.current = ScrollTrigger.create({
        trigger: voyageSection.current,
        start: 'top top',
        end: '+=3000%',
        pin: true,
        scrub: 0.5,

        onUpdate: (self) => {
          const p = self.progress;
          if (scrollCueRef.current) {
            gsap.set(scrollCueRef.current, {
              opacity: p < 0.025 ? 1 : 0,
              y: p < 0.025 ? 0 : 8,
            });
          }
          const opacity = new Array(videoSources.length).fill(0);

          let transitionIndex = 0;

          while (
            transitionIndex < transitions.length &&
            p > transitions[transitionIndex][1]
          ) {
            transitionIndex++;
          }

          if (transitionIndex >= transitions.length) {
            opacity[videoSources.length - 1] = 1;
          } else {
            const [start, end] = transitions[transitionIndex];

            if (p < start) {
              opacity[transitionIndex] = 1;
            } else {
              const fade = gsap.utils.clamp(0, 1, (p - start) / (end - start));

              opacity[transitionIndex] = 1 - fade;
              opacity[transitionIndex + 1] = fade;
            }
          }

          videos.forEach((video, index) => {
            gsap.set(video, { opacity: opacity[index] });

            if (opacity[index] > 0.01) {
              if (video.paused && !video.ended) {
                video.play().catch(() => {});
              }
            } else if (!video.paused) {
              video.pause();
            }
          });

          // Show arrival messages while each ship-arrival clip is playing.
          const arrivalRanges = [
            [0, 0.31],
            [0.46, 0.61],
            [0.76, 0.91],
          ];
          arrivalRanges.forEach(([start, end], index) => {
            const overlay = arrivalRefs.current[index];
            if (!overlay) return;
            const visible = p >= start && p <= end;
            gsap.set(overlay, {
              opacity: visible ? 1 : 0,
              pointerEvents: 'none',
            });
          });

          // Show event interface only while its island video is active.
          overlayRanges.forEach(([start, end], index) => {
            const overlay = overlayRefs.current[index];
            if (!overlay) return;

            const visible = p >= start && p <= end;

            gsap.set(overlay, {
              opacity: visible ? 1 : 0,
              pointerEvents: visible ? 'auto' : 'none',
            });
          });
        },
      });
    }, voyageSection);

    return () => {
      ctx.revert();
      voyageTrigger.current = null;
      videos.forEach((video) => video.pause());
    };
  }, [introFinished]);

  // The voyage is one long pinned ScrollTrigger scene. Ordinary #voyage links
  // can only reach its beginning, so use the triggerapos;s measured scroll range
  // to navigate to a specific point inside the cinematic sequence.
  const navigateToVoyage = (progress: number) => {
    const trigger = voyageTrigger.current;
    if (!trigger) {
      voyageSection.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }

    const clampedProgress = Math.min(1, Math.max(0, progress));
    const destination =
      trigger.start + (trigger.end - trigger.start) * clampedProgress;
    window.scrollTo({ top: destination, behavior: 'smooth' });
  };

  // Voyage is a replay action: return to the first ship-arrival clip and
  // restart it from the beginning, even if the visitor is already at the top.
  const replayVoyage = () => {
    const trigger = voyageTrigger.current;
    const firstArrivalVideo = videoRefs.current[0];

    if (!trigger) {
      voyageSection.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      if (firstArrivalVideo) {
        firstArrivalVideo.currentTime = 0;
        firstArrivalVideo.play().catch(() => {});
      }
      return;
    }

    // Set the pinned scene to its exact start so ScrollTrigger reveals video 0.
    trigger.scroll(trigger.start);
    ScrollTrigger.update();

    if (firstArrivalVideo) {
      firstArrivalVideo.pause();
      firstArrivalVideo.currentTime = 0;
      firstArrivalVideo.play().catch(() => {});
    }
  };

  if (!introFinished) {
    return <OpeningScreen onComplete={() => setIntroFinished(true)} />;
  }

  return (
    <main className="overflow-hidden bg-[#080b12] text-white">
      {/* FLOATING AVINYA NAVIGATION */}
      <header className="fixed left-1/2 top-2 z-[80] w-[calc(100%-1rem)] max-w-5xl -translate-x-1/2 sm:top-4 sm:w-[calc(100%-2rem)]">
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between gap-2 rounded-2xl border border-white/15 bg-[#080b12]/70 px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:gap-4 sm:rounded-full sm:px-6 sm:py-3"
        >
          <a
            href="#voyage"
            className="shrink-0 text-sm font-black tracking-[0.16em] text-white sm:text-base"
          >
            AVINYA <span className="text-amber-200">&apos;27</span>
          </a>
          <div className="flex min-w-0 items-center justify-end gap-2 overflow-x-auto text-[9px] font-semibold text-white/75 sm:gap-5 sm:text-xs md:gap-7 md:text-sm">
            <a
              href="#voyage"
              onClick={(event) => {
                event.preventDefault();
                replayVoyage();
              }}
              className="whitespace-nowrap transition-colors hover:text-amber-200"
            >
              Voyage
            </a>
            <a
              href="#voyage"
              onClick={(event) => {
                event.preventDefault();
                // Day 1&apos;s event interface is visible from progress 0.31 to 0.42.
                navigateToVoyage(0.33);
              }}
              className="whitespace-nowrap transition-colors hover:text-amber-200"
            >
              Events
            </a>
            <a
              href="#hack2future"
              className="whitespace-nowrap transition-colors hover:text-amber-200"
            >
              Hack2Future
            </a>
            <a
              href="#about-avinya"
              className="whitespace-nowrap transition-colors hover:text-amber-200"
            >
              About
            </a>
          </div>
        </nav>
      </header>

      {/* CINEMATIC VOYAGE */}
      <section
        id="voyage"
        ref={voyageSection}
        className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-[#061725]"
      >
        {/* Six voyage videos */}
        {videoSources.map((src, index) => (
          <video
            key={src}
            ref={(element) => {
              videoRefs.current[index] = element;
            }}
            src={src}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}

        {/* Global cinematic overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        {/* Subtle scroll cue: visible at the start of the voyage, then fades away. */}
        <div
          ref={scrollCueRef}
          className="pointer-events-none absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-white/85 sm:bottom-9"
          style={{
            opacity: 1,
            transition: 'opacity 350ms ease, transform 350ms ease',
          }}
          aria-hidden="true"
        >
          <span className="text-[8px] font-semibold uppercase tracking-[0.32em] sm:text-[9px] sm:tracking-[0.4em]">
            Scroll to explore
          </span>
          <span className="flex h-7 w-[17px] items-start justify-center rounded-full border border-white/65 p-[4px]">
            <span
              className="avinya-scroll-dot h-1.5 w-1 rounded-full bg-white"
              style={{ animation: 'avinyaScrollDot 1.2s ease-in-out infinite' }}
            />
          </span>
        </div>
        <style>{`
          @keyframes avinyaScrollDot {
            0%, 100% { transform: translateY(0); opacity: 1; }
            70% { transform: translateY(7px); opacity: 0.25; }
          }
          @media (prefers-reduced-motion: reduce) {
            .avinya-scroll-dot { animation: none !important; }
          }
        `}</style>

        {/* Arrival messages appear over the ship&apos;s approach to each island. */}
        {[
          {
            eyebrow: 'DAY 01',
            title: 'THE LAST OUTPOST',
            accent: 'text-amber-200',
          },
          {
            eyebrow: 'DAY 02',
            title: 'THE PANDEMONIUM',
            accent: 'text-cyan-200',
          },
          {
            eyebrow: 'DAY 03',
            title: 'THE CARNIVAL ISLAND',
            accent: 'text-pink-200',
          },
        ].map((arrival, index) => (
          <div
            key={arrival.eyebrow}
            ref={(element) => {
              arrivalRefs.current[index] = element;
            }}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 text-center"
            style={{ opacity: 0 }}
          >
            <div className="rounded-full border border-white/20 bg-black/20 px-5 py-3 shadow-lg backdrop-blur-[2px] sm:px-7 sm:py-4">
              <p
                className={`text-[9px] font-semibold tracking-[0.3em] ${arrival.accent}`}
              >
                {arrival.eyebrow}
              </p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[0.12em] text-white drop-shadow-lg sm:text-2xl md:text-3xl">
                {arrival.title}
              </h2>
            </div>
          </div>
        ))}

        {/* Day 1 interface — Desert island video */}
        <div
          ref={(element) => {
            overlayRefs.current[0] = element;
          }}
          className="absolute inset-0 z-20 overflow-hidden"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          <IslandOverlay island={islandData[0]} />
        </div>

        {/* Day 2 interface — Cyberpunk island video */}
        <div
          ref={(element) => {
            overlayRefs.current[1] = element;
          }}
          className="absolute inset-0 z-20 overflow-hidden"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          <IslandOverlay island={islandData[1]} />
        </div>

        {/* Day 3 interface — Carnival island video */}
        <div
          ref={(element) => {
            overlayRefs.current[2] = element;
          }}
          className="absolute inset-0 z-20 overflow-hidden"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          <IslandOverlay island={islandData[2]} />
        </div>
      </section>

      {/* HACK2FUTURE */}
      <section
        id="hack2future"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030711] px-6 py-24 text-white"
      >
        <video
          src="https://raw.githubusercontent.com/kalikibhuvanesh/avinya-2027/main/hack2future.mp4"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#020611]/65" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold tracking-[0.6em] text-cyan-200">
            THE FUTURE IS BUILT HERE
          </p>

          <h2 className="mt-5 break-words text-[clamp(2.2rem,9vw,6rem)] font-black leading-none tracking-tight sm:mt-7 md:text-8xl">
            HACK<span className="text-cyan-300">2</span>FUTURE
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/75 md:text-xl">
            Avinya hosts Hack2Future, IIIT Dharwad&apos;s flagship
            national-level hackathon. A space for builders, thinkers and
            innovators to challenge what&apos;s possible.
          </p>

          <p className="mt-8 text-sm tracking-[0.3em] text-cyan-100">
            PART OF AVINYA 2027 · MARCH 12–14
          </p>

          <a
            href="https://hack2future.iiitdwd.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/50 bg-cyan-300/10 px-7 py-3 text-sm font-semibold tracking-wide text-cyan-100 shadow-lg shadow-cyan-950/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-100 hover:bg-cyan-300/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030711]"
          >
            More about Hack2Future <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* CONTACT & FOOTER */}
      <footer
        id="about-avinya"
        className="relative overflow-hidden bg-[#05070d] px-6 py-20 text-white"
      >
        <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-[110px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold tracking-[0.45em] text-cyan-200/80">
              THE JOURNEY DOESN&apos;T END HERE
            </p>
            <h2 className="mt-4 break-words text-[clamp(1.8rem,7vw,3.75rem)] font-black leading-tight tracking-[0.08em] sm:tracking-[0.14em] md:text-6xl">
              STAY CONNECTED
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/55 md:text-base">
              Follow the updates, reach out to our team, or find your way to
              Avinya.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl md:p-9">
              <p className="text-xs font-semibold tracking-[0.3em] text-cyan-200">
                FOLLOW THE VOYAGE
              </p>
              <h3 className="mt-3 text-2xl font-bold">Find us online</h3>
              <p className="mt-2 text-sm text-white/50">
                Follow the official Avinya account for announcements and
                updates.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/iiitdwd.avinya/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Avinya on Instagram"
                  title="Instagram — @iiitdwd.avinya"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-sm font-bold text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/60 hover:bg-cyan-200/10 hover:text-cyan-100"
                >
                  IG
                </a>
              </div>

              <div className="mt-9 border-t border-white/10 pt-7">
                <p className="text-xs font-semibold tracking-[0.3em] text-cyan-200">
                  CONTACT THE TEAM
                </p>
                <p className="mt-3 text-sm text-white/55">
                  For event enquiries, collaborations and other information:
                </p>
                <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60">
                  Contact details coming soon
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl">
              <div className="p-7 pb-5 md:p-9 md:pb-5">
                <p className="text-xs font-semibold tracking-[0.3em] text-amber-200">
                  FIND YOUR WAY
                </p>
                <h3 className="mt-3 text-2xl font-bold">
                  The Avinya destination
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  IIIT Dharwad Campus, Ittigatti Road, near Sattur Colony,
                  Dharwad, Karnataka 580009.
                </p>
              </div>
              <a
                href="https://www.google.com/maps/place/Indian+Institute+of+Information+Technology+(IIIT),+Dharwad/@15.3939686,75.0241902,17z/"
                target="_blank"
                rel="noreferrer"
                aria-label="View IIIT Dharwad on Google Maps"
                className="group relative block h-56 overflow-hidden border-y border-white/10 bg-[#14212b]"
              >
                {/* Lightweight decorative map preview: no third-party iframe required. */}
                <div className="absolute inset-0 opacity-80" aria-hidden="true">
                  <div className="absolute inset-0 bg-[linear-gradient(32deg,transparent_46%,rgba(148,190,190,0.18)_47%,rgba(148,190,190,0.18)_49%,transparent_50%),linear-gradient(145deg,transparent_38%,rgba(148,190,190,0.13)_39%,rgba(148,190,190,0.13)_41%,transparent_42%)]" />
                  <div className="absolute -left-8 top-16 h-5 w-[120%] rotate-[-13deg] rounded-full border-y border-[#d2c6a0]/30 bg-[#c9b98a]/10" />
                  <div className="absolute -left-8 top-32 h-3 w-[120%] rotate-[18deg] rounded-full border-y border-[#d2c6a0]/25 bg-[#c9b98a]/10" />
                  <div className="absolute left-[18%] top-[-35%] h-[180%] w-4 rotate-[34deg] rounded-full border-x border-[#d2c6a0]/25 bg-[#c9b98a]/10" />
                  <div className="absolute right-[18%] top-[-35%] h-[180%] w-3 rotate-[-25deg] rounded-full border-x border-[#d2c6a0]/20 bg-[#c9b98a]/10" />
                  <div className="absolute left-[8%] top-[16%] h-12 w-20 rounded-xl bg-emerald-300/10" />
                  <div className="absolute bottom-[12%] right-[10%] h-16 w-28 rounded-xl bg-emerald-300/10" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07111a]/25 text-center transition-colors duration-300 group-hover:bg-[#07111a]/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-100/40 bg-cyan-200/15 text-2xl shadow-[0_0_35px_rgba(103,232,249,0.25)] backdrop-blur-sm">
                    ⌖
                  </span>
                  <span className="mt-3 text-sm font-bold tracking-wide text-white drop-shadow">
                    IIIT DHARWAD
                  </span>
                  <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/65">
                    15.3939686° N · 75.0267651° E
                  </span>
                  <span className="mt-3 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-sm">
                    Click to view map ↗
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-between gap-4 p-6 md:px-9">
                <span className="text-xs text-white/45">
                  IIIT Dharwad · Karnataka, India
                </span>
                <a
                  href="https://www.google.com/maps/place/Indian+Institute+of+Information+Technology+(IIIT),+Dharwad/@15.3939686,75.0241902,17z/data=!3m1!4b1!4m6!3m5!1s0x3bb8d3a4bc7f5c91:0xf0fc456099430c57!8m2!3d15.3939686!4d75.0267651!16s%2Fg%2F11bwgvgs24?entry=ttu&g_ep=EgoyMDI2MTAyNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-amber-200/60 hover:text-amber-100"
                >
                  Open map ↗
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-2xl font-black tracking-[0.25em]">
                AVINYA <span className="text-cyan-200">&apos;27</span>
              </h2>
              <p className="mt-2 text-xs text-white/40">
                Three days. Three worlds. One Avinya.
              </p>
            </div>
            <p className="text-xs text-white/35">
              © 2027 AVINYA · IIIT Dharwad
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
