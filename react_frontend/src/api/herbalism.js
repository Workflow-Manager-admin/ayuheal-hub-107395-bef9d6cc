// Herbalism dummy API - replace with real fetch to Ayurveda JSON database backend

const REMEDIES = [
  {
    id: "a1",
    name: "Ashwagandha",
    category: "Stress Relief",
    shortDesc: "Calms the mind and reduces anxiety.",
    keyUses: ["Reduces stress", "Boosts immunity"],
    image: "/herb-placeholder.jpg"
  },
  {
    id: "a2",
    name: "Tulsi",
    category: "Immunity",
    shortDesc: "Supports immune system & respiratory health.",
    keyUses: ["Cough/cold", "Balances Kapha dosha"],
    image: "/herb-placeholder.jpg"
  },
  {
    id: "a3",
    name: "Turmeric",
    category: "Digestive Health",
    shortDesc: "Powerful anti-inflammatory for gut health.",
    keyUses: ["Reduces inflammation", "Improves digestion"],
    image: "/herb-placeholder.jpg"
  }
];

export function getAllRemedies() {
  return Promise.resolve(REMEDIES);
}

export function getFeaturedRemedies() {
  return Promise.resolve(REMEDIES);
}

export function getCategories() {
  return Promise.resolve([...new Set(REMEDIES.map(r => r.category))]);
}
