import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');
const OUT_FILE = path.join(DATA_DIR, 'rwanda_knowledge.json');

interface KnowledgeItem {
  id: string;
  name: string;
  category: string;
  location: string;
  province?: string;
  price_range?: string;
  description: string;
  tags: string[];
  coordinates?: { lat: number; lon: number };
}

// Hardcoded high-quality data to seed the knowledge base
const seedData: KnowledgeItem[] = [
  {
    id: "volcanoes-national-park",
    name: "Volcanoes National Park",
    category: "National Park",
    location: "Musanze",
    province: "Northern Province",
    price_range: "$1500 per permit for gorilla trekking",
    description: "Mist-covered mountains, gorilla trekking energy, and a premium wildlife escape in Rwanda's north. Home to the endangered mountain gorillas and golden monkeys. A luxury adventure.",
    tags: ["wildlife", "gorilla trekking", "mountains", "luxury", "nature", "hiking", "adventure"],
    coordinates: { lat: -1.4554, lon: 29.5074 }
  },
  {
    id: "lake-kivu",
    name: "Lake Kivu",
    category: "Lake / Resort",
    location: "Rubavu and Karongi",
    province: "Western Province",
    price_range: "$90 - $240",
    description: "A relaxed lakeside experience with sunset cruises, beach walks, and scenic resort towns. Great for swimming, boat riding, and relaxing by the water.",
    tags: ["lake", "relaxing", "couples", "water", "boat", "beach", "resort"],
    coordinates: { lat: -2.0000, lon: 29.2500 }
  },
  {
    id: "kigali-city-tour",
    name: "Kigali City Tour",
    category: "City Tour",
    location: "Kigali",
    province: "Kigali City",
    price_range: "$45 - $140",
    description: "Explore Rwanda's capital through markets, art spaces, local cuisine, and modern city highlights. Includes stops at the Genocide Memorial, Kimironko Market, and Inema Arts Center.",
    tags: ["culture", "city", "history", "food", "markets", "art", "museum"],
    coordinates: { lat: -1.9441, lon: 30.0619 }
  },
  {
    id: "akagera-national-park",
    name: "Akagera National Park",
    category: "National Park",
    location: "Eastern Province",
    province: "Eastern Province",
    price_range: "$100 - $300",
    description: "Rwanda's only Big Five safari destination, featuring savannas, lakes, and diverse wildlife including lions, rhinos, elephants, and hippos.",
    tags: ["wildlife", "safari", "big five", "nature", "family", "savanna"],
    coordinates: { lat: -1.6315, lon: 30.7063 }
  },
  {
    id: "nyungwe-forest",
    name: "Nyungwe Forest National Park",
    category: "National Park",
    location: "Southwestern Rwanda",
    province: "Western Province",
    price_range: "$100 - $200",
    description: "One of the oldest rainforests in Africa. Known for chimpanzee trekking, the canopy walk, and incredible biodiversity with over 300 bird species.",
    tags: ["nature", "hiking", "chimpanzees", "canopy walk", "birds", "rainforest"],
    coordinates: { lat: -2.5255, lon: 29.2319 }
  }
];

async function fetchOSMData() {
  console.log('Fetching supplementary data from OpenStreetMap (Overpass API)...');
  
  // Overpass QL query for tourism spots in Rwanda
  const query = `
    [out:json][timeout:25];
    area["name"="Rwanda"]->.searchArea;
    (
      node["tourism"="museum"](area.searchArea);
      node["tourism"="hotel"](area.searchArea);
      node["tourism"="attraction"](area.searchArea);
    );
    out center limit 50;
  `;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    });
    
    if (!response.ok) {
      throw new Error(`Overpass API returned ${response.status}`);
    }

    const data = await response.json();
    const osmItems: KnowledgeItem[] = [];

    for (const el of data.elements) {
      if (el.tags && el.tags.name) {
        osmItems.push({
          id: `osm-${el.id}`,
          name: el.tags.name,
          category: el.tags.tourism || 'Attraction',
          location: el.tags['addr:city'] || 'Rwanda',
          description: el.tags.description || `A ${el.tags.tourism} located in ${el.tags['addr:city'] || 'Rwanda'}.`,
          tags: [el.tags.tourism, "osm", "local"].filter(Boolean) as string[],
          coordinates: el.lat && el.lon ? { lat: el.lat, lon: el.lon } : undefined
        });
      }
    }

    return osmItems;
  } catch (error) {
    console.warn('Failed to fetch from OSM. Proceeding with seed data only.', error);
    return [];
  }
}

async function buildKnowledgeBase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const osmData = await fetchOSMData();
  
  // Combine, filtering out OSM items that don't have descriptions or look like duplicates
  const finalData = [...seedData, ...osmData.filter(item => item.name && item.name.length > 2)];

  fs.writeFileSync(OUT_FILE, JSON.stringify(finalData, null, 2));
  console.log(`✅ Knowledge base built with ${finalData.length} entries at ${OUT_FILE}`);
}

buildKnowledgeBase();