// types/models.ts

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  nameJa: string;
  nameRu: string;
  slug: string;
  imageUrl: string | null;
  sector: string;
  createdAt: Date;
}

export interface Manufacturer {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

export interface Specification {
  id: string;
  nameEn: string;
  nameAr: string;
  nameJa: string;
  nameRu: string;
  slug: string;
  createdAt: Date;
}

export interface Unit {
  id: string;
  name: string;
  createdAt: Date;
}

export interface MachinerySpecification {
  id: string;
  machineryId: string;
  specificationId: string;
  value: string;
  unitId: string | null;
}

export interface Machinery {
  id: string;
  titleEn: string;
  titleAr: string;
  titleJa: string;
  titleRu: string;
  slug: string;
  stockNo: string | null;
  year: number | null;
  hour: number | null;
  price: number | null;
  location: string;
  sector: string;
  minPrice: number | null;
  avgPrice: number | null;
  maxPrice: number | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  descriptionJa: string | null;
  descriptionRu: string | null;
  featured: boolean;
  isSold: boolean;
  isAvailableForExport: boolean;
  categoryId: string;
  manufacturerId: string;
  createdAt: Date;
}

export interface MachineryImage {
  id: string;
  imageUrl: string;
  machineryId: string;
  createdAt: Date;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  message: string;
  status: string;
  createdAt: Date;
}

export interface MachineryView {
  id: string;
  machineryId: string;
  ipAddress: string;
  createdAt: Date;
}

export interface ExportCountry {
  id: string;
  nameEn: string;
  nameAr: string;
  nameJa: string;
  nameRu: string;
  slug: string;
  countryCode: string | null;
  createdAt: Date;
}

export interface Setting {
  key: string;
  value: string;
}
