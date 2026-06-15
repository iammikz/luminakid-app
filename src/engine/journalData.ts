import type { JournalEntry } from "../types/activity";

export const JOURNAL_DATA: Record<number, JournalEntry> = {
  6: {
    monthLabel: "6 months",
    developmentFocus:
      "Your baby is discovering that their actions cause reactions. Touching the screen and seeing a response builds the cause-and-effect link.",
    parentTip: "Try different textures: soft blanket, smooth table, and bumpy toy. Name what baby feels.",
    milestones: [
      "Reaches for objects intentionally",
      "Brings hands to midline",
      "Tracks moving objects with eyes",
      "Responds to familiar voices"
    ],
    parentActivity:
      "Hold a bright toy just out of reach. When baby reaches, bring it close and say, \"You got it!\""
  },
  7: {
    monthLabel: "7 months",
    developmentFocus:
      "Intentional reaching and object tracking are growing. Slow, satisfying movement gives baby time to notice and respond.",
    parentTip: "Try blowing real bubbles outside and naming what happens as they float and pop.",
    milestones: ["Sits with support", "Transfers objects hand to hand", "Babbles consonants", "Shows excitement"],
    parentActivity: "Gently roll a soft ball to baby and cheer when they grab it."
  },
  8: {
    monthLabel: "8 months",
    developmentFocus:
      "Baby is connecting sounds to meaning. Animal sounds build early language and auditory memory.",
    parentTip: "Point to animals in books and make the sounds: \"Cow. Moo.\"",
    milestones: ["Understands no", "Imitates sounds", "May begin crawling", "Stranger anxiety may appear"],
    parentActivity: "Take a walk and name simple things you see: dog, bird, tree, car."
  },
  9: {
    monthLabel: "9 months",
    developmentFocus:
      "Peekaboo supports object permanence: things continue to exist even when hidden.",
    parentTip: "Hide a toy under a blanket and watch whether baby looks for it.",
    milestones: ["Pulls to stand", "May say mama or dada", "Waves bye-bye", "Points at objects"],
    parentActivity: "Play peekaboo with your hands, a cloth, or around a corner."
  },
  10: {
    monthLabel: "10 months",
    developmentFocus:
      "Following a moving target builds attention, visual prediction, and coordinated reaching.",
    parentTip: "Move a flashlight dot slowly on the wall and let baby watch and swipe.",
    milestones: ["Claps hands", "Responds to name", "Cruises along furniture", "First words may emerge"],
    parentActivity: "Move a ribbon slowly for baby to follow, then pause so they can grab it."
  },
  11: {
    monthLabel: "11 months",
    developmentFocus:
      "Color play strengthens visual discrimination while reinforcing cause and effect.",
    parentTip: "Point out colors in daily routines: red cup, blue sky, green grass.",
    milestones: ["Stands briefly", "Imitates actions", "Points to wants", "May say two or three words"],
    parentActivity: "Sort safe objects by color and name each color as baby explores."
  },
  12: {
    monthLabel: "12 months",
    developmentFocus:
      "First words grow through repetition. Picture-word pairing helps baby store familiar sounds.",
    parentTip: "Narrate simple routines with repeated words: water, soap, clean hands.",
    milestones: ["First birthday", "Walks with support or alone", "Says first meaningful words", "Points to named items"],
    parentActivity: "Read a board book and repeat picture names: cat, ball, milk."
  },
  13: {
    monthLabel: "13-15 months",
    developmentFocus:
      "Matching asks toddlers to hold an image in working memory and recognize sameness.",
    parentTip: "Start with face-up matching cards before trying hidden cards.",
    milestones: ["Walks independently", "Vocabulary grows", "Imitates household tasks", "Shows preferences"],
    parentActivity: "Match pairs of socks while naming colors and counting."
  },
  16: {
    monthLabel: "16-18 months",
    developmentFocus:
      "Shape sorting combines recognition, motor planning, and early problem solving.",
    parentTip: "Let baby try a physical shape sorter before helping.",
    milestones: ["Runs unsteadily", "Vocabulary expands", "Combines simple words", "Begins symbolic play"],
    parentActivity: "Draw large shapes and place matching toys inside each outline."
  },
  19: {
    monthLabel: "19-24 months",
    developmentFocus:
      "Simple puzzles build spatial reasoning and persistence through small challenges.",
    parentTip: "Use large knobbed floor puzzles and take turns placing pieces.",
    milestones: ["Uses two-word phrases", "Runs confidently", "Sorts by shape and color", "Pretend play expands"],
    parentActivity: "Build block structures together, knock them down, and rebuild."
  }
};
