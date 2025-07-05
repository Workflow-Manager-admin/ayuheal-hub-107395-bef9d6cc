/*
  Herbalism API for AyuCare - fetches real data from the open Phylliida Herbalism JSON.
  See: https://github.com/Phylliida/herbalism-database (remedies.json, plants.json).
  Key desired fields: id, name (common name), category/tags, description, uses, image.
*/

const HERBALISM_JSON_URL =
  "https://raw.githubusercontent.com/Phylliida/herbalism-database/master/database/herbs.json";

/**
 * Utility: Map incoming herb object to AyuCare UI remedy format
 * eg. {
 *   id: "angelica-sinensis",
 *   name: "Angelica Sinensis",
 *   latin: "Angelica sinensis",
 *   categories: ["roots", "tonics"],
 *   actions: ["tonic", "blood tonic"],
 *   indications: [ ... ],
 *   images: [ ... ],
 *   description: "...",
 *   // ...
 * }
 * ==> {
 *   id, name, category, shortDesc, keyUses, image
 * }
 */
function mapHerbToRemedy(herb) {
  return {
    id: herb.id || herb._id || herb.name,
    name: herb.name,
    category: Array.isArray(herb.categories) && herb.categories.length ? herb.categories[0] : "General",
    shortDesc:
      herb.description?.length > 140
        ? herb.description.slice(0, 137) + "..."
        : herb.description || "A traditional remedy.",
    keyUses: Array.isArray(herb.actions) && herb.actions.length
      ? herb.actions.slice(0, 4)
      : (herb.indications || []).slice(0, 4),
    image: Array.isArray(herb.images) && herb.images.length ? herb.images[0] : "/herb-placeholder.jpg"
  };
}

// We cache once on first load
let HERB_CACHE = null;

// PUBLIC_INTERFACE
export async function getAllRemedies() {
  if (HERB_CACHE) return HERB_CACHE;
  const resp = await fetch(HERBALISM_JSON_URL);
  if (!resp.ok) throw new Error("Unable to fetch herbalism data");
  const herbs = await resp.json();
  const remedies = herbs.map(mapHerbToRemedy);
  HERB_CACHE = remedies;
  return remedies;
}

// PUBLIC_INTERFACE
export async function getFeaturedRemedies() {
  const remedies = await getAllRemedies();
  // Pick first 3 with images for demo
  return remedies.filter(r => r.image && r.image !== "/herb-placeholder.jpg").slice(0, 3).length
    ? remedies.filter(r => r.image && r.image !== "/herb-placeholder.jpg").slice(0, 3)
    : remedies.slice(0, 3);
}

// PUBLIC_INTERFACE
export async function getCategories() {
  const remedies = await getAllRemedies();
  const cats = remedies.map(r => r.category).filter(Boolean);
  // De-dupe, proper label-case
  const categorySet = Array.from(new Set(cats)).sort();
  return categorySet;
}
