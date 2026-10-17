export interface PhotoItem {
  id: string;
  filename: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: 'portraits' | 'traditional' | 'candid' | 'favorites';
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  orientation?: 'portrait' | 'landscape';
  isHeroCandidate?: boolean;
  featuredInStory?: boolean;
  notes?: string;
}

export interface StoryMilestone {
  id: string;
  title: string;
  dateLabel: string;
  photoId: string;
  description: string;
  quote?: string;
}

export interface SpecialReason {
  id: string;
  title: string;
  tagline: string;
  quote: string;
  iconName: string;
  accentColor: string;
}
