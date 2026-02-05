export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  image: string | null;
  pricing: string;
}

// We still keep the type definition here, but data will come from API/JSON
