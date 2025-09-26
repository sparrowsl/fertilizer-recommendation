import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types";

export async function GET() {
	try {
		const healthData = {
			status: "healthy",
			timestamp: new Date().toISOString(),
			version: "1.0.0",
			services: {
				api: "operational",
				imageAnalysis: "operational",
				soilAnalysis: "operational",
				database: "simulated",
			},
			uptime: process.uptime(),
			memory: {
				used:
					Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) /
					100,
				total:
					Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) /
					100,
			},
			environment: process.env.NODE_ENV || "development",
			features: {
				imageUpload: true,
				soilAnalysis: true,
				cropRecommendations: true,
				fertilizerCalculator: true,
				budgetEstimation: true,
			},
		};

		return NextResponse.json<ApiResponse>({
			success: true,
			message: "AgriSmart platform is healthy and operational",
			data: healthData,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Health check failed:", error);

		return NextResponse.json<ApiResponse>(
			{
				success: false,
				message: "Health check failed",
				error: error instanceof Error ? error.message : "Unknown error",
				timestamp: new Date().toISOString(),
			},
			{ status: 500 },
		);
	}
}
