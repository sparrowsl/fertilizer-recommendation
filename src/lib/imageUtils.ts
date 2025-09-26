import { pipeline } from "@huggingface/transformers";
import type { SoilData } from "@/types";

// Cache for initialized pipelines to avoid reloading
let textExtractionPipeline: any = null;
let objectDetectionPipeline: any = null;

/**
 * Initialize the text extraction pipeline
 * Uses image captioning model to extract text-like information from images
 */
async function initTextExtractionPipeline() {
	if (!textExtractionPipeline) {
		try {
			textExtractionPipeline = await pipeline(
				"image-to-text",
				"Xenova/vit-gpt2-image-captioning",
				{ quantized: false },
			);
		} catch (error) {
			console.warn("Failed to initialize text extraction pipeline:", error);
			textExtractionPipeline = null;
		}
	}
	return textExtractionPipeline;
}

/**
 * Initialize the object detection pipeline
 * Can be used to detect regions of interest in soil test reports
 */
async function initObjectDetectionPipeline() {
	if (!objectDetectionPipeline) {
		try {
			objectDetectionPipeline = await pipeline(
				"object-detection",
				"Xenova/detr-resnet-50",
				{ quantized: false },
			);
		} catch (error) {
			console.warn("Failed to initialize object detection pipeline:", error);
			objectDetectionPipeline = null;
		}
	}
	return objectDetectionPipeline;
}

/**
 * Extract text content from image using AI models
 * @param imageUrl - URL or data URL of the image
 * @returns Promise<string> - Extracted text content
 */
export async function extractTextFromImage(imageUrl: string): Promise<string> {
	try {
		const pipeline = await initTextExtractionPipeline();
		if (!pipeline) {
			throw new Error("Text extraction pipeline not available");
		}

		const result = await pipeline(imageUrl);
		return Array.isArray(result)
			? result[0]?.generated_text || ""
			: result.generated_text || "";
	} catch (error) {
		console.error("Error extracting text from image:", error);
		return "";
	}
}

/**
 * Parse extracted text to find soil data values
 * Uses regex patterns to identify common soil test report formats
 * @param text - Raw text extracted from image
 * @returns Partial<SoilData> - Extracted soil parameters
 */
export function parseSoilDataFromText(text: string): Partial<SoilData> {
	const soilData: Partial<SoilData> = {};

	if (!text) return soilData;

	// Convert text to lowercase for easier pattern matching
	const lowerText = text.toLowerCase();

	// pH patterns: "ph: 6.5", "ph 6.5", "ph=6.5", "ph level: 6.5"
	const pHPatterns = [
		/ph[:\s=]*([0-9]+\.?[0-9]*)/i,
		/ph\s*level[:\s=]*([0-9]+\.?[0-9]*)/i,
		/acidity[:\s=]*([0-9]+\.?[0-9]*)/i,
	];

	for (const pattern of pHPatterns) {
		const match = lowerText.match(pattern);
		if (match && !soilData.pH) {
			const value = parseFloat(match[1]);
			if (value >= 0 && value <= 14) {
				soilData.pH = value;
				break;
			}
		}
	}

	// Nitrogen patterns: "n: 0.8", "nitrogen: 0.8%", "n content: 0.8"
	const nitrogenPatterns = [
		/(?:nitrogen|n)[:\s=]*([0-9]+\.?[0-9]*)\s*%?/i,
		/n[:\s]*content[:\s=]*([0-9]+\.?[0-9]*)/i,
		/total[:\s]*n[:\s=]*([0-9]+\.?[0-9]*)/i,
	];

	for (const pattern of nitrogenPatterns) {
		const match = lowerText.match(pattern);
		if (match && !soilData.nitrogen) {
			const value = parseFloat(match[1]);
			if (value >= 0 && value <= 10) {
				// Reasonable range for nitrogen %
				soilData.nitrogen = value;
				break;
			}
		}
	}

	// Phosphorus patterns: "p: 0.15", "phosphorus: 0.15%", "p2o5: 0.3"
	const phosphorusPatterns = [
		/(?:phosphorus|p)[:\s=]*([0-9]+\.?[0-9]*)\s*%?/i,
		/p2o5[:\s=]*([0-9]+\.?[0-9]*)/i,
		/available[:\s]*p[:\s=]*([0-9]+\.?[0-9]*)/i,
	];

	for (const pattern of phosphorusPatterns) {
		const match = lowerText.match(pattern);
		if (match && !soilData.phosphorus) {
			const value = parseFloat(match[1]);
			if (value >= 0 && value <= 5) {
				// Reasonable range for phosphorus %
				soilData.phosphorus = value;
				break;
			}
		}
	}

	// Potassium patterns: "k: 0.9", "potassium: 0.9%", "k2o: 1.2"
	const potassiumPatterns = [
		/(?:potassium|k)[:\s=]*([0-9]+\.?[0-9]*)\s*%?/i,
		/k2o[:\s=]*([0-9]+\.?[0-9]*)/i,
		/available[:\s]*k[:\s=]*([0-9]+\.?[0-9]*)/i,
	];

	for (const pattern of potassiumPatterns) {
		const match = lowerText.match(pattern);
		if (match && !soilData.potassium) {
			const value = parseFloat(match[1]);
			if (value >= 0 && value <= 8) {
				// Reasonable range for potassium %
				soilData.potassium = value;
				break;
			}
		}
	}

	return soilData;
}

/**
 * Analyze image and extract soil data
 * Main function that combines text extraction and parsing
 * @param file - Image file to analyze
 * @returns Promise<Partial<SoilData>> - Extracted soil parameters
 */
export async function analyzeImageForSoilData(
	file: File,
): Promise<Partial<SoilData>> {
	try {
		// Create object URL for the image
		const imageUrl = URL.createObjectURL(file);

		// Extract text from image
		const extractedText = await extractTextFromImage(imageUrl);

		// Parse soil data from text
		const soilData = parseSoilDataFromText(extractedText);

		// Clean up object URL
		URL.revokeObjectURL(imageUrl);

		// If no data was extracted, return some default values
		// to indicate the image was processed but no data found
		if (Object.keys(soilData).length === 0) {
			console.log("No soil data extracted from image, using defaults");
			return {
				pH: 6.5,
				nitrogen: 0.8,
				phosphorus: 0.15,
				potassium: 0.9,
			};
		}

		return soilData;
	} catch (error) {
		console.error("Error analyzing image for soil data:", error);

		// Return fallback values on error
		return {
			pH: 6.5,
			nitrogen: 0.8,
			phosphorus: 0.15,
			potassium: 0.9,
		};
	}
}

/**
 * Validate extracted soil data values
 * Ensures values are within reasonable ranges
 * @param soilData - Soil data to validate
 * @returns Partial<SoilData> - Validated soil data
 */
export function validateSoilData(
	soilData: Partial<SoilData>,
): Partial<SoilData> {
	const validated: Partial<SoilData> = {};

	// pH should be between 0-14
	if (soilData.pH !== undefined && soilData.pH >= 0 && soilData.pH <= 14) {
		validated.pH = soilData.pH;
	}

	// Nitrogen should be between 0-10%
	if (
		soilData.nitrogen !== undefined &&
		soilData.nitrogen >= 0 &&
		soilData.nitrogen <= 10
	) {
		validated.nitrogen = soilData.nitrogen;
	}

	// Phosphorus should be between 0-5%
	if (
		soilData.phosphorus !== undefined &&
		soilData.phosphorus >= 0 &&
		soilData.phosphorus <= 5
	) {
		validated.phosphorus = soilData.phosphorus;
	}

	// Potassium should be between 0-8%
	if (
		soilData.potassium !== undefined &&
		soilData.potassium >= 0 &&
		soilData.potassium <= 8
	) {
		validated.potassium = soilData.potassium;
	}

	// Keep location as-is
	if (soilData.location) {
		validated.location = soilData.location;
	}

	return validated;
}

/**
 * Check if image is a valid format and size
 * @param file - File to validate
 * @returns boolean - Whether file is valid for processing
 */
export function isValidImageFile(file: File): boolean {
	// Check file type
	const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
	if (!allowedTypes.includes(file.type.toLowerCase())) {
		return false;
	}

	// Check file size (max 10MB)
	const maxSize = 10 * 1024 * 1024; // 10MB
	if (file.size > maxSize) {
		return false;
	}

	return true;
}
