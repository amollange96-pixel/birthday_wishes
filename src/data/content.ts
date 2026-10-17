import { SpecialReason, StoryMilestone } from '../types';

export const BIRTHDAY_INFO = {
  name: 'Gauravi',
  senderName: 'Amol',
  birthdayMonth: 11, // November (1-indexed)
  birthdayDay: 2,   // 2nd
  heroTitle: 'Happy Birthday, My Gauravi ❤️',
  heroSubtitle: 'Today is all about the most beautiful part of my world.',
  heroIntro:
    'Some people make the world more beautiful just by being in it. For me, you are one of those people. Today, I want to celebrate you, your smile, your kindness, and all the little things that make you uniquely you.',
};

export const SPECIAL_REASONS: SpecialReason[] = [
  {
    id: 'reason-1',
    title: 'Your Smile',
    tagline: 'Card 1',
    quote: 'Your smile has a way of making even an ordinary day feel a little more beautiful.',
    iconName: 'Smile',
    accentColor: 'from-pink-500/20 to-rose-500/30',
  },
  {
    id: 'reason-2',
    title: 'Your Presence',
    tagline: 'Card 2',
    quote: 'Just having you around makes the little moments in life feel meaningful.',
    iconName: 'Sparkles',
    accentColor: 'from-amber-500/20 to-rose-400/30',
  },
  {
    id: 'reason-3',
    title: 'Your Heart',
    tagline: 'Card 3',
    quote: 'I admire the kindness, warmth, and care you bring into the lives of people around you.',
    iconName: 'HeartHandshake',
    accentColor: 'from-rose-500/20 to-purple-500/30',
  },
  {
    id: 'reason-4',
    title: 'Your Uniqueness',
    tagline: 'Card 4',
    quote: 'There is no one else quite like you, and that is one of the many things I love about you.',
    iconName: 'Flame',
    accentColor: 'from-purple-500/20 to-pink-500/30',
  },
  {
    id: 'reason-5',
    title: 'Our Memories',
    tagline: 'Card 5',
    quote: 'The little moments we share are precious to me, and I hope we create many more beautiful ones together.',
    iconName: 'Camera',
    accentColor: 'from-rose-400/20 to-amber-500/30',
  },
  {
    id: 'reason-6',
    title: 'You Being You',
    tagline: 'Card 6',
    quote: "You don't have to be perfect to be special. Being yourself is already something wonderful.",
    iconName: 'Crown',
    accentColor: 'from-pink-600/20 to-amber-400/30',
  },
];

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    id: 'story-1',
    title: 'The Day Our Story Began',
    dateLabel: 'A Special Beginning',
    photoId: 'photo-2',
    description:
      'Where two paths crossed and something truly special started blossoming. The beginning of countless smiles, quiet conversations, and memories that stay etched forever.',
    quote: 'Every great love story starts with a simple moment that changes everything.',
  },
  {
    id: 'story-2',
    title: 'A Memory I Keep Close',
    dateLabel: 'Treasured Moment',
    photoId: 'photo-1',
    description:
      'Seeing you happy and radiating elegance. There are moments that stop time, and remembering how you looked and smiled is one of my absolute favorites.',
    quote: 'Some memories are like gentle warmth on a cold evening.',
  },
  {
    id: 'story-3',
    title: 'One of My Favorite Moments',
    dateLabel: 'Pure Joy',
    photoId: 'photo-3',
    description:
      'Your effortless sweetness and spontaneous joy. When laughter comes naturally and you are completely, beautifully yourself.',
    quote: 'In your laughter, I find my peace.',
  },
  {
    id: 'story-4',
    title: 'A Moment That Made Me Smile',
    dateLabel: 'Quiet Magic',
    photoId: 'photo-5',
    description:
      'Even ordinary days become extraordinary with you. The way you adjust your hair, share a glance, and brighten up my day without even trying.',
    quote: 'The magic was never in grand gestures, but in the quiet everyday moments with you.',
  },
  {
    id: 'story-5',
    title: 'More Memories Yet to Come',
    dateLabel: 'The Horizon Ahead',
    photoId: 'photo-7',
    description:
      'New adventures, more shared dreams, endless celebrations, and quiet moments yet to be written. Hand in hand, one beautiful memory at a time.',
    quote: 'And this is only one chapter of our story. ❤️',
  },
];

export const BIRTHDAY_LETTER = {
  salutation: 'My Dearest Gauravi, ❤️',
  paragraphs: [
    'Happy Birthday to the girl who holds such a special place in my heart.',
    'Today is your day, and I wish I could put into words just how wonderful you are and how much happiness your presence brings into my life.',
    "There is something beautiful about you that goes beyond words. It's in your smile, your little expressions, the way you make ordinary moments memorable, and all those little things that make you who you are.",
    'On your birthday, I wish you endless happiness, good health, peace, success, and the courage to chase every dream your heart holds. I hope this new chapter of your life brings you beautiful opportunities, wonderful surprises, and countless reasons to smile.',
    'I want you to know that you deserve to feel appreciated, respected, supported, and loved. Never forget how valuable you are and how much your happiness matters.',
    'Thank you for being you, Gauravi. Thank you for the memories, the smiles, and every single moment that has made my journey brighter with you in it.',
    'Happy Birthday once again, my special girl. May this year be as beautiful, kind, and radiant as your heart.',
  ],
  closing: 'With all my love and warmth,',
  signature: 'Always yours, Amol ❤️',
};
