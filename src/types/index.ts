// Soil data types
export interface SoilData {
	pH: number;
	nitrogen: number; // N content (%)
	phosphorus: number; // P content (%)
	potassium: number; // K content (%)
	moisture: number; // Moisture content (%)
	organicMatter: number; // Organic matter content (%)
	texture:
		| "clay"
		| "sand"
		| "loam"
		| "silt"
		| "clay-loam"
		| "sandy-loam"
		| "silty-loam";
	location: {
		latitude: number;
		longitude: number;
		address?: string;
	};
	temperature?: number; // Average temperature (°C)
	rainfall?: number; // Annual rainfall (mm)
}

// Crop recommendation types
export interface CropRecommendation {
	id: string;
	name: string;
	scientificName?: string;
	suitabilityScore: number; // 0-100
	profitabilityRank: number; // 1-n ranking
	estimatedYield: number; // tons per hectare
	marketPrice: number; // price per kg/ton
	estimatedRevenue: number; // estimated revenue per hectare
	growthPeriod: number; // days to harvest
	waterRequirement: "low" | "medium" | "high";
	seasonality: string[]; // e.g., ['spring', 'summer']
	reasons: string[]; // Why this crop is recommended
}

// Fertilizer recommendation types
export interface FertilizerMix {
	npkRatio: {
		nitrogen: number; // N percentage
		phosphorus: number; // P percentage
		potassium: number; // K percentage
	};
	applicationRate: number; // kg per hectare
	estimatedCost: number; // cost per hectare
	micronutrients?: {
		name: string;
		amount: number; // in grams or kg
	}[];
	applicationTiming: string[]; // e.g., ['pre-planting', 'mid-season']
	instructions: string[];
}

// Product recommendations
export interface FertilizerProduct {
	id: string;
	name: string;
	brand: string;
	npkRatio: string; // e.g., "20-10-10"
	price: number; // price per bag/unit
	bagSize: number; // kg per bag
	availability: "available" | "limited" | "out-of-stock";
	supplier?: string;
	description?: string;
}

// Complete analysis response
export interface SoilAnalysisResult {
	id: string;
	timestamp: string;
	soilData: SoilData;
	soilHealth: {
		overallScore: number; // 0-100
		deficiencies: string[];
		strengths: string[];
		recommendations: string[];
	};
	cropRecommendations: CropRecommendation[];
	fertilizerMix: FertilizerMix;
	fertilizerProducts: FertilizerProduct[];
	estimatedBudget: {
		seedCost: number;
		fertilizerCost: number;
		totalInputCost: number;
		estimatedProfit: number;
	};
}

// Image analysis types
export interface ImageAnalysisRequest {
	imageUrl: string;
	imageType: "soil-sample" | "soil-test-report" | "field-photo" | "crop-photo";
	location?: {
		latitude: number;
		longitude: number;
	};
	additionalNotes?: string;
}

export interface ImageAnalysisResponse {
	success: boolean;
	message: string;
	data?: {
		extractedData: Partial<SoilData>;
		confidence: number; // 0-100
		detectedElements: string[];
		suggestions: string[];
		needsManualReview: boolean;
	};
	error?: string;
}

// API response types
export interface ApiResponse<T = any> {
	success: boolean;
	message: string;
	data?: T;
	error?: string;
	timestamp: string;
}

// Form data types
export interface SoilInputForm {
	hasLabResults: boolean;
	soilData: Partial<SoilData>;
	farmSize: number; // in hectares
	budget: number; // available budget
	preferredCrops?: string[]; // crops farmer is interested in
	previousCrops?: string[]; // what was grown before
	farmingExperience: "beginner" | "intermediate" | "experienced";
	irrigationAvailable: boolean;
	organicFarmingPreference: boolean;
}

// User types
export interface User {
	id: string;
	name: string;
	email?: string;
	phone?: string;
	location: {
		country: string;
		state: string;
		district: string;
		village?: string;
	};
	farmSize: number; // hectares
	userType: "farmer" | "agronomist" | "ngo" | "government";
	registrationDate: string;
}

// Report types
export interface RecommendationReport {
	id: string;
	userId: string;
	analysisId: string;
	generatedAt: string;
	reportType: "basic" | "detailed" | "premium";
	content: {
		executiveSummary: string;
		soilAnalysis: string;
		cropRecommendations: string;
		fertilizerGuidance: string;
		implementationPlan: string[];
		timeline: {
			activity: string;
			timing: string;
			priority: "high" | "medium" | "low";
		}[];
	};
	downloadUrl?: string;
}

// Weather integration types
export interface WeatherData {
	location: {
		latitude: number;
		longitude: number;
	};
	current: {
		temperature: number;
		humidity: number;
		rainfall: number;
		windSpeed: number;
	};
	forecast: {
		date: string;
		minTemp: number;
		maxTemp: number;
		precipitation: number;
		humidity: number;
	}[];
	seasonal: {
		season: "spring" | "summer" | "monsoon" | "winter";
		avgTemperature: number;
		avgRainfall: number;
		suitableForPlanting: boolean;
	};
}

// Marketplace types (for future integration)
export interface MarketplaceListing {
	id: string;
	type: "fertilizer" | "seeds" | "equipment" | "produce";
	title: string;
	description: string;
	price: number;
	unit: string;
	quantity: number;
	seller: {
		id: string;
		name: string;
		rating: number;
		location: string;
	};
	images: string[];
	category: string;
	isOrganic: boolean;
	deliveryAvailable: boolean;
}

// Error types
export interface ValidationError {
	field: string;
	message: string;
	code: string;
}

export interface AppError {
	type: "validation" | "api" | "network" | "auth" | "server";
	message: string;
	code?: string;
	details?: any;
}
