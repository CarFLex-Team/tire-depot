export interface SpeedRatingInfo {
  rating: string;
  maxSpeedMph: number;
  label: string;
  usage: string;
}

const SPEED_RATINGS: Record<string, SpeedRatingInfo> = {
  L: {
    rating: "L",
    maxSpeedMph: 75,
    label: "75 mph",
    usage: "Light trucks, off-road tires",
  },
  M: {
    rating: "M",
    maxSpeedMph: 81,
    label: "81 mph",
    usage: "Light trucks, utility vehicles",
  },
  N: {
    rating: "N",
    maxSpeedMph: 87,
    label: "87 mph",
    usage: "Light trucks, SUVs",
  },
  P: {
    rating: "P",
    maxSpeedMph: 93,
    label: "93 mph",
    usage: "Passenger cars, touring tires",
  },
  Q: {
    rating: "Q",
    maxSpeedMph: 99,
    label: "99 mph",
    usage: "Winter tires, all-season tires",
  },
  R: {
    rating: "R",
    maxSpeedMph: 106,
    label: "106 mph",
    usage: "Passenger cars, touring tires",
  },
  S: {
    rating: "S",
    maxSpeedMph: 112,
    label: "112 mph",
    usage: "Everyday passenger cars",
  },
  T: {
    rating: "T",
    maxSpeedMph: 118,
    label: "118 mph",
    usage: "Standard passenger cars",
  },
  U: {
    rating: "U",
    maxSpeedMph: 124,
    label: "124 mph",
    usage: "Some European passenger cars",
  },
  H: {
    rating: "H",
    maxSpeedMph: 130,
    label: "130 mph",
    usage: "High-performance sedans",
  },
  V: {
    rating: "V",
    maxSpeedMph: 149,
    label: "149 mph",
    usage: "Sports cars, performance vehicles",
  },
  W: {
    rating: "W",
    maxSpeedMph: 168,
    label: "168 mph",
    usage: "Ultra-high-performance summer tires",
  },
  Y: {
    rating: "Y",
    maxSpeedMph: 186,
    label: "186 mph",
    usage: "Supercars, high-speed performance tires",
  },
  Z: {
    rating: "Z",
    maxSpeedMph: 149,
    label: "149+ mph (older designation)",
    usage: "Older high-performance designation",
  },
};

export function getSpeedRating(rating: string): SpeedRatingInfo | null {
  if (!rating) return null;
  return SPEED_RATINGS[rating.trim().toUpperCase()] ?? null;
}

const loadIndexToLbs: Record<string, number> = {
  "75": 853,
  "76": 882,
  "77": 908,
  "78": 937,
  "79": 963,
  "80": 992,
  "81": 1019,
  "82": 1047,
  "83": 1074,
  "84": 1102,
  "85": 1135,
  "86": 1168,
  "87": 1201,
  "88": 1235,
  "89": 1279,
  "90": 1323,
  "91": 1356,
  "92": 1389,
  "93": 1433,
  "94": 1477,
  "95": 1521,
  "96": 1565,
  "97": 1609,
  "98": 1653,
  "99": 1709,
  "100": 1764,
  "101": 1819,
  "102": 1874,
  "103": 1929,
  "104": 1984,
  "105": 2039,
  "106": 2094,
  "107": 2149,
  "108": 2205,
  "109": 2271,
  "110": 2337,
  "111": 2403,
  "112": 2469,
  "113": 2535,
  "114": 2601,
  "115": 2679,
  "116": 2756,
  "117": 2833,
  "118": 2910,
  "119": 2998,
  "120": 3086,
  "121": 3197,
};

export function getLoadCapacity(index: string) {
  return loadIndexToLbs[index] || null;
}
