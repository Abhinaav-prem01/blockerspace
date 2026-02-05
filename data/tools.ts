export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  image?: string;
  pricing: "Free" | "Freemium" | "Paid";
}

// We still keep the type definition here, but data will come from API/JSON
