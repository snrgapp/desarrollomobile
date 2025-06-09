export interface SwipeItem {
  id: number | string;
  name: string;
  age: number;
  image: string;
  bio?: string;
  interests?: string[];
  location?: string;
  profession?: string;
  [key: string]: any; // Allow additional properties
}

export interface SwipeStackProps {
  data: SwipeItem[];
  renderCard: (item: SwipeItem) => React.ReactElement;
  onSwipeLeft: (item: SwipeItem) => void;
  onSwipeRight: (item: SwipeItem) => void;
}

export interface SwipeCardProps {
  item: SwipeItem;
}
