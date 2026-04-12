export interface KnowledgeItem {
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

export interface EmbeddingRecord {
  id: string;
  embedding: number[];
  norm: number;
}
