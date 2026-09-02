/**
 * ============================================================
 * DEMO COPY -- NOT REVIEWED, NOT LEGAL-APPROVED
 * ============================================================
 * Written by Claude so the pages are readable end to end. Before this is
 * published anywhere, the privacy section in particular needs review by
 * someone who can confirm it matches what the app actually does and meets the
 * obligations a school would be signing up to.
 *
 * TWO CLAIMS DELIBERATELY NOT MADE HERE
 * Both were checked against the original pitch and found weaker than
 * presented. Do not reintroduce them.
 *
 * 1. NO SWEEPING "MULTI-STATE MANDATE" CLAIM. The New York mandate detail is
 *    real but narrower than the pitch implies. Nothing below asserts broad
 *    multi-state middle-school requirements, and nothing should without a
 *    citation sitting next to the sentence.
 *
 * 2. NO COMPETITIVE-VACUUM FRAMING. NGPF and EverFi are free,
 *    sponsor-subsidised and already widely adopted. The copy below names them
 *    and positions this as a diagnostic layer that runs alongside them, which
 *    is both accurate and the stronger pitch.
 *
 * NO STATISTICS. There is no pilot. Every number a visitor could read as
 * evidence has been left out on purpose.
 */

export const homeCopy = {
  announcement: "Early build",

  hero: {
    eyebrow: "Classroom diagnostic",
    headline: "Find out what your class",
    headlineAccent: "actually thinks.",
    subhead:
      "A five-minute set of decision scenarios that shows which specific money misconceptions your students hold — inferred from the choices they make, not from asking them what they know.",
    primaryCta: "Try a scenario",
    secondaryCta: "See the teacher view",
  },

  problem: {
    eyebrow: "The gap",
    headline: "A quiz tells you the score.",
    headlineAccent: "Not the reason.",
    subhead:
      "Two students can miss the same question for completely different reasons, and a percentage cannot tell them apart. What a teacher needs is the reason, because that is the thing you reteach.",
  },

  how: {
    eyebrow: "How it works",
    headline: "Three steps, one",
    headlineAccent: "class period.",
    subhead:
      "No accounts, no installs, and nothing for students to remember. It runs in a browser tab on a school Chromebook.",
    steps: [
      {
        title: "Start a session",
        body: "Generate a six-character code and put it on the board. It identifies the class run, not a student.",
      },
      {
        title: "Students decide",
        body: "Each student works through short scenarios with real trade-offs. Every option they can pick is mapped to a specific named misconception.",
      },
      {
        title: "Read the rollup",
        body: "The class view ranks which misconceptions actually showed up and how widely, so you know what to reteach before the next lesson.",
      },
    ],
  },

  features: {
    eyebrow: "What makes it different",
    headline: "Built to diagnose,",
    headlineAccent: "not to grade.",
    subhead:
      "The whole design follows from one decision: answers map to reasons instead of to right and wrong.",
    items: [
      {
        title: "Choice-level mapping",
        body: "Every option a student can select points at a named misconception, or at nothing. There is no answer key in the codebase.",
      },
      {
        title: "Class-level rollup",
        body: "Prevalence is measured against the students who were actually asked, not the whole class, so branching does not distort the numbers.",
      },
      {
        title: "No accounts, no names",
        body: "There is no field anywhere in the app that collects a name, an email, or anything else identifying. Session codes identify a class run.",
      },
      {
        title: "Five minutes",
        body: "Designed to fit inside a lesson you are already teaching rather than replace one.",
      },
      {
        title: "Runs on a Chromebook",
        body: "A browser tab and nothing else. No install, no extension, no plugin, no district software request.",
      },
      {
        title: "Works alongside your curriculum",
        body: "This is a diagnostic layer, not a course. It is meant to sit on top of what you already use — NGPF, EverFi, Banzai, or your own materials.",
      },
    ],
  },

  privacy: {
    eyebrow: "Privacy",
    headline: "We do not collect anything",
    headlineAccent: "about your students.",
    body: "The tool was built so that anonymity is a property of the code rather than a promise in a policy. There is no sign-up, no roster import, and no analytics script. A session code identifies a class run; several students share one, and their answers are not linked to each other or to any person.",
    points: [
      {
        title: "No names or contact details",
        body: "The application contains no input for a name, email, username, or date of birth. The only field a student ever types into is the session code.",
      },
      {
        title: "No tracking or fingerprinting",
        body: "No third-party analytics, advertising, or session-replay scripts are loaded, and nothing about the device is recorded.",
      },
      {
        title: "Progress stays on the device",
        body: "A student's in-progress answers are stored in their own browser so they can resume, under a random identifier that is never transmitted. Clearing site data removes it.",
      },
    ],
  },

  faq: {
    eyebrow: "Questions",
    headline: "The things teachers",
    headlineAccent: "ask first.",
    subhead:
      "If something here is unclear or you want to try it with a class, get in touch — this is an early build and feedback shapes it.",
    items: [
      {
        q: "How is this different from a quiz?",
        a: "A quiz records whether an answer was right. This records why an answer was chosen. Each option maps to a specific misconception, so two students who both get something wrong can show up as two different problems to fix. There is no score.",
      },
      {
        q: "Does it replace what we already teach?",
        a: "No, and it is not meant to. Free curricula like NGPF and EverFi are already widely used and cover far more ground than this does. This is a short diagnostic you run inside a lesson to find out what to emphasise.",
      },
      {
        q: "What do students have to sign up for?",
        a: "Nothing. There is no account and no login. You generate a session code, students type it in, and that is the whole setup.",
      },
      {
        q: "How long does it take?",
        a: "About five minutes of class time. The scenarios are short and branch, so students who reveal a misconception get a follow-up that checks whether it holds.",
      },
      {
        q: "Has this been tested with real classes?",
        a: "Not yet. This is an early build, the scenario content has not been reviewed by a financial-literacy educator, and no pilot has been run. Any numbers you see in the app are illustrative and are labelled as such.",
      },
    ],
  },

  closing: {
    headline: "See what your class",
    headlineAccent: "actually thinks.",
    subhead:
      "Try a scenario yourself, or open the teacher view to see how a class rollup reads.",
    cta: "Try a scenario",
  },
} as const;

export const joinCopy = {
  headline: "Enter your",
  headlineAccent: "session code.",
  subhead:
    "Your teacher will read out a six-character code or put it on the board. Type it in to begin.",
  privacyNote:
    "We do not ask for your name or anything else about you. The code identifies your class, not you, and nobody can tell which answers were yours.",
} as const;

export const teacherCopy = {
  headline: "What this class",
  headlineAccent: "misunderstands.",
  subhead:
    "Start a session, then read the rollup once students have finished. Misconceptions are ranked by how many of the students who were asked actually revealed each one.",
  emptyState:
    "Nothing has been recorded for this session yet. Generate a code, have the class run a scenario, and the rollup will fill in here.",
} as const;
