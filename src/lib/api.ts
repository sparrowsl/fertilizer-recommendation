// API utility functions for the fertilizer recommendation platform

import type {
	ApiResponse,
	ImageAnalysisRequest,
	ImageAnalysisResponse,
	SoilAnalysisResult,
	SoilData,
	SoilInputForm,
	ValidationError,
} from "@/types";

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Generic API request function
async function apiRequest<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<ApiResponse<T>> {
	try {
		const url = `${API_BASE_URL}${endpoint}`;
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || `HTTP error! status: ${response.status}`);
		}

		return data;
	} catch (error) {
		console.error(`API request failed for ${endpoint}:`, error);
		throw error;
	}
}

// Soil analysis API calls
export async function analyzeSoilData(
	soilData: SoilData,
	additionalInfo?: Partial<SoilInputForm>,
): Promise<SoilAnalysisResult> {
	const response = await apiRequest<SoilAnalysisResult>("/api/analyze-soil", {
		method: "POST",
		body: JSON.stringify({
			soilData,
			...additionalInfo,
		}),
	});

	if (!response.success || !response.data) {
		throw new Error(response.message || "Failed to analyze soil data");
	}

	return response.data;
}

// Image upload and analysis
export async function uploadAndAnalyzeImage(
	file: File,
	imageType: string = "soil-test-report",
	location?: { latitude: number; longitude: number },
	additionalNotes?: string,
): Promise<ImageAnalysisResponse> {
	const formData = new FormData();
	formData.append("image", file);
	formData.append("imageType", imageType);

	if (location) {
		formData.append("latitude", location.latitude.toString());
		formData.append("longitude", location.longitude.toString());
	}

	if (additionalNotes) {
		formData.append("additionalNotes", additionalNotes);
	}

	try {
		const response = await fetch("/api/upload-image", {
			method: "POST",
			body: formData,
		});

		const result = await response.json();

		if (!response.ok || !result.success) {
			throw new Error(result.message || "Failed to analyze image");
		}

		return result.data;
	} catch (error) {
		console.error("Image upload failed:", error);
		throw error;
	}
}

// Data validation functions
export function validateSoilData(
	soilData: Partial<SoilData>,
): ValidationError[] {
	const errors: ValidationError[] = [];

	// pH validation
	if (soilData.pH !== undefined) {
		if (soilData.pH < 0 || soilData.pH > 14) {
			errors.push({
				field: "pH",
				message: "pH must be between 0 and 14",
				code: "INVALID_RANGE",
			});
		}
	} else {
		errors.push({
			field: "pH",
			message: "pH is required",
			code: "REQUIRED_FIELD",
		});
	}

	// Nitrogen validation
	if (soilData.nitrogen !== undefined) {
		if (soilData.nitrogen < 0 || soilData.nitrogen > 5) {
			errors.push({
				field: "nitrogen",
				message: "Nitrogen percentage must be between 0 and 5",
				code: "INVALID_RANGE",
			});
		}
	} else {
		errors.push({
			field: "nitrogen",
			message: "Nitrogen content is required",
			code: "REQUIRED_FIELD",
		});
	}

	// Phosphorus validation
	if (soilData.phosphorus !== undefined) {
		if (soilData.phosphorus < 0 || soilData.phosphorus > 2) {
			errors.push({
				field: "phosphorus",
				message: "Phosphorus percentage must be between 0 and 2",
				code: "INVALID_RANGE",
			});
		}
	} else {
		errors.push({
			field: "phosphorus",
			message: "Phosphorus content is required",
			code: "REQUIRED_FIELD",
		});
	}

	// Potassium validation
	if (soilData.potassium !== undefined) {
		if (soilData.potassium < 0 || soilData.potassium > 3) {
			errors.push({
				field: "potassium",
				message: "Potassium percentage must be between 0 and 3",
				code: "INVALID_RANGE",
			});
		}
	} else {
		errors.push({
			field: "potassium",
			message: "Potassium content is required",
			code: "REQUIRED_FIELD",
		});
	}

	// Organic matter validation
	if (soilData.organicMatter !== undefined) {
		if (soilData.organicMatter < 0 || soilData.organicMatter > 20) {
			errors.push({
				field: "organicMatter",
				message: "Organic matter percentage must be between 0 and 20",
				code: "INVALID_RANGE",
			});
		}
	} else {
		errors.push({
			field: "organicMatter",
			message: "Organic matter content is required",
			code: "REQUIRED_FIELD",
		});
	}

	// Moisture validation
	if (soilData.moisture !== undefined) {
		if (soilData.moisture < 0 || soilData.moisture > 100) {
			errors.push({
				field: "moisture",
				message: "Moisture percentage must be between 0 and 100",
				code: "INVALID_RANGE",
			});
		}
	}

	// Texture validation
	const validTextures = [
		"clay",
		"sand",
		"loam",
		"silt",
		"clay-loam",
		"sandy-loam",
		"silty-loam",
	];

	if (soilData.texture && !validTextures.includes(soilData.texture)) {
		errors.push({
			field: "texture",
			message: "Invalid soil texture",
			code: "INVALID_VALUE",
		});
	} else if (!soilData.texture) {
		errors.push({
			field: "texture",
			message: "Soil texture is required",
			code: "REQUIRED_FIELD",
		});
	}

	return errors;
}

export function validateFormData(formData: SoilInputForm): ValidationError[] {
	const errors: ValidationError[] = [];

	// Validate soil data
	errors.push(...validateSoilData(formData.soilData));

	// Farm size validation
	if (formData.farmSize <= 0) {
		errors.push({
			field: "farmSize",
			message: "Farm size must be greater than 0",
			code: "INVALID_RANGE",
		});
	}

	// Budget validation
	if (formData.budget < 0) {
		errors.push({
			field: "budget",
			message: "Budget cannot be negative",
			code: "INVALID_RANGE",
		});
	}

	return errors;
}

// File validation for image uploads
export function validateImageFile(file: File): ValidationError[] {
	const errors: ValidationError[] = [];

	// File type validation
	const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
	if (!allowedTypes.includes(file.type)) {
		errors.push({
			field: "image",
			message: "Only JPEG, PNG, and WebP files are allowed",
			code: "INVALID_FILE_TYPE",
		});
	}

	// File size validation (max 10MB)
	const maxSize = 10 * 1024 * 1024; // 10MB
	if (file.size > maxSize) {
		errors.push({
			field: "image",
			message: "File size must be less than 10MB",
			code: "FILE_TOO_LARGE",
		});
	}

	// File name validation
	if (!file.name || file.name.length < 1) {
		errors.push({
			field: "image",
			message: "Invalid file name",
			code: "INVALID_FILE_NAME",
		});
	}

	return errors;
}

// Utility functions for data formatting
export function formatCurrency(
	amount: number,
	currency: string = "USD",
): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(amount);
}

export function formatPercentage(value: number, decimals: number = 1): string {
	return `${value.toFixed(decimals)}%`;
}

export function formatWeight(value: number, unit: string = "kg"): string {
	return `${value.toFixed(1)} ${unit}`;
}

// Data transformation utilities
export function transformSoilDataForAPI(soilData: Partial<SoilData>): SoilData {
	return {
		pH: soilData.pH || 0,
		nitrogen: soilData.nitrogen || 0,
		phosphorus: soilData.phosphorus || 0,
		potassium: soilData.potassium || 0,
		moisture: soilData.moisture || 0,
		organicMatter: soilData.organicMatter || 0,
		texture: soilData.texture || "loam",
		location: {
			latitude: soilData.location?.latitude || 0,
			longitude: soilData.location?.longitude || 0,
			address: soilData.location?.address || "",
		},
		temperature: soilData.temperature,
		rainfall: soilData.rainfall,
	};
}

// Error handling utilities
export function handleApiError(error: any): string {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === "string") {
		return error;
	}

	if (error?.message) {
		return error.message;
	}

	return "An unexpected error occurred. Please try again.";
}

// Loading state management
export function createLoadingState() {
	let loadingStates: Record<string, boolean> = {};

	return {
		setLoading: (key: string, loading: boolean) => {
			loadingStates[key] = loading;
		},
		isLoading: (key: string) => loadingStates[key] || false,
		isAnyLoading: () => Object.values(loadingStates).some(Boolean),
		clearAll: () => {
			loadingStates = {};
		},
	};
}

// Local storage utilities for caching
export function saveToLocalStorage(key: string, data: any): void {
	try {
		if (typeof window !== "undefined") {
			localStorage.setItem(key, JSON.stringify(data));
		}
	} catch (error) {
		console.warn("Failed to save to localStorage:", error);
	}
}

export function loadFromLocalStorage<T>(key: string): T | null {
	try {
		if (typeof window !== "undefined") {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		}
	} catch (error) {
		console.warn("Failed to load from localStorage:", error);
	}
	return null;
}

export function removeFromLocalStorage(key: string): void {
	try {
		if (typeof window !== "undefined") {
			localStorage.removeItem(key);
		}
	} catch (error) {
		console.warn("Failed to remove from localStorage:", error);
	}
}

// Cache keys for the application
export const CACHE_KEYS = {
	LAST_SOIL_DATA: "agrismart_last_soil_data",
	USER_PREFERENCES: "agrismart_user_preferences",
	RECENT_ANALYSES: "agrismart_recent_analyses",
} as const;
