// Core soil data interface
export interface SoilData {
	pH?: number;
	nitrogen?: number; // N content (%)
	phosphorus?: number; // P content (%)
	potassium?: number; // K content (%)
	location?: string;
}

// Form data interface
export interface FormData {
	soilData: SoilData;
	farmSize?: number;
	crops?: string;
	imageFile?: File;
}

// Crop recommendation interface
export interface CropRecommendation {
	name: string;
	suitability: number; // 0-100
	expectedYield: string;
}

// Fertilizer recommendation interface
export interface FertilizerRecommendation {
	npkRatio: string; // e.g., "10-10-10"
	quantity: string; // e.g., "200 kg/hectare"
	estimatedCost: string; // e.g., "$150"
}

// Soil health assessment interface
export interface SoilHealth {
	status: string;
	improvements: string[];
}

// Complete analysis results interface
export interface AnalysisResults {
	recommendedCrops: CropRecommendation[];
	fertilizerRecommendation: FertilizerRecommendation;
	soilHealth: SoilHealth;
}

// Error handling interface
export interface AppError {
	type: "validation" | "processing" | "network";
	message: string;
	details?: any;
}
