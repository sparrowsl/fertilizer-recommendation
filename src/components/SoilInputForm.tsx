"use client";

import { useState, useId } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SoilInputForm as SoilInputFormType, SoilData } from "@/types";

interface SoilInputFormProps {
  onSubmit: (data: SoilInputFormType) => void;
  onImageAnalysis?: (data: Partial<SoilData>) => void;
  loading?: boolean;
}

export default function SoilInputForm({ onSubmit, onImageAnalysis, loading }: SoilInputFormProps) {
  const [formData, setFormData] = useState<SoilInputFormType>({
    hasLabResults: false,
    soilData: {
      pH: undefined,
      nitrogen: undefined,
      phosphorus: undefined,
      potassium: undefined,
      moisture: undefined,
      organicMatter: undefined,
      texture: undefined,
      location: {
        latitude: 0,
        longitude: 0,
        address: "",
      },
    },
    farmSize: 0,
    budget: 0,
    preferredCrops: [],
    previousCrops: [],
    farmingExperience: "beginner",
    irrigationAvailable: false,
    organicFarmingPreference: false,
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Generate unique IDs for form fields
  const farmSizeId = useId();
  const budgetId = useId();
  const experienceId = useId();
  const addressId = useId();
  const irrigationId = useId();
  const organicId = useId();
  const pHId = useId();
  const nitrogenId = useId();
  const phosphorusId = useId();
  const potassiumId = useId();
  const moistureId = useId();
  const organicMatterId = useId();
  const textureId = useId();
  const preferredCropsId = useId();
  const previousCropsId = useId();

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentLocation(location);
          setFormData(prev => ({
            ...prev,
            soilData: {
              ...prev.soilData,
              location: {
                ...prev.soilData.location,
                ...location,
              },
            },
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  // Handle image upload for soil analysis
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("imageType", "soil-test-report");

      if (currentLocation) {
        formData.append("latitude", currentLocation.latitude.toString());
        formData.append("longitude", currentLocation.longitude.toString());
      }

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data?.data) {
        const extractedData = result.data.data.extractedData;

        // Update form with extracted data
        setFormData(prev => ({
          ...prev,
          hasLabResults: true,
          soilData: {
            ...prev.soilData,
            ...extractedData,
          },
        }));

        // Notify parent component
        if (onImageAnalysis) {
          onImageAnalysis(extractedData);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean | string[]) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof SoilInputFormType] as Record<string, unknown>),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSoilDataChange = (field: keyof SoilData, value: string | number | { latitude: number; longitude: number; address?: string }) => {
    setFormData(prev => ({
      ...prev,
      soilData: {
        ...prev.soilData,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📸 Upload Soil Test Report
          </CardTitle>
          <CardDescription>
            Upload a photo of your soil test report for automatic data extraction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={getCurrentLocation}
              className="shrink-0"
            >
              📍 Get Location
            </Button>
            {currentLocation && (
              <span className="text-sm text-green-600">
                Location captured: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={imageUploading}
              className="cursor-pointer"
            />
            {imageUploading && (
              <p className="text-sm text-blue-600">Analyzing image...</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Farm Information */}
      <Card>
        <CardHeader>
          <CardTitle>🌾 Farm Information</CardTitle>
          <CardDescription>Tell us about your farm</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor={farmSizeId} className="text-sm font-medium">Farm Size (hectares)</label>
            <Input
              id={farmSizeId}
              type="number"
              step="0.1"
              value={formData.farmSize || ""}
              onChange={(e) => handleInputChange("farmSize", parseFloat(e.target.value) || 0)}
              placeholder="e.g., 2.5"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={budgetId} className="text-sm font-medium">Available Budget ($)</label>
            <Input
              id={budgetId}
              type="number"
              value={formData.budget || ""}
              onChange={(e) => handleInputChange("budget", parseFloat(e.target.value) || 0)}
              placeholder="e.g., 1000"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={experienceId} className="text-sm font-medium">Farming Experience</label>
            <select
              id={experienceId}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.farmingExperience}
              onChange={(e) => handleInputChange("farmingExperience", e.target.value)}
            >
              <option value="beginner">Beginner (0-2 years)</option>
              <option value="intermediate">Intermediate (3-10 years)</option>
              <option value="experienced">Experienced (10+ years)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor={addressId} className="text-sm font-medium">Farm Address</label>
            <Input
              id={addressId}
              type="text"
              value={formData.soilData.location?.address || ""}
              onChange={(e) => handleSoilDataChange("location", {
                latitude: formData.soilData.location?.latitude || 0,
                longitude: formData.soilData.location?.longitude || 0,
                address: e.target.value
              })}
              placeholder="Enter your farm address"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={irrigationId}
              checked={formData.irrigationAvailable}
              onChange={(e) => handleInputChange("irrigationAvailable", e.target.checked)}
              className="rounded"
            />
            <label htmlFor={irrigationId} className="text-sm font-medium">
              Irrigation Available
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={organicId}
              checked={formData.organicFarmingPreference}
              onChange={(e) => handleInputChange("organicFarmingPreference", e.target.checked)}
              className="rounded"
            />
            <label htmlFor={organicId} className="text-sm font-medium">
              Prefer Organic Farming
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Soil Data */}
      <Card>
        <CardHeader>
          <CardTitle>🌱 Soil Information</CardTitle>
          <CardDescription>
            {formData.hasLabResults
              ? "Data extracted from your uploaded test report"
              : "Enter your soil test results manually"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor={pHId} className="text-sm font-medium">pH Level</label>
            <Input
              id={pHId}
              type="number"
              step="0.1"
              min="0"
              max="14"
              value={formData.soilData.pH || ""}
              onChange={(e) => handleSoilDataChange("pH", parseFloat(e.target.value))}
              placeholder="6.5"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={nitrogenId} className="text-sm font-medium">Nitrogen (%)</label>
            <Input
              id={nitrogenId}
              type="number"
              step="0.01"
              min="0"
              max="5"
              value={formData.soilData.nitrogen || ""}
              onChange={(e) => handleSoilDataChange("nitrogen", parseFloat(e.target.value))}
              placeholder="0.8"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={phosphorusId} className="text-sm font-medium">Phosphorus (%)</label>
            <Input
              id={phosphorusId}
              type="number"
              step="0.01"
              min="0"
              max="2"
              value={formData.soilData.phosphorus || ""}
              onChange={(e) => handleSoilDataChange("phosphorus", parseFloat(e.target.value))}
              placeholder="0.15"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={potassiumId} className="text-sm font-medium">Potassium (%)</label>
            <Input
              id={potassiumId}
              type="number"
              step="0.01"
              min="0"
              max="3"
              value={formData.soilData.potassium || ""}
              onChange={(e) => handleSoilDataChange("potassium", parseFloat(e.target.value))}
              placeholder="0.9"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={moistureId} className="text-sm font-medium">Moisture Content (%)</label>
            <Input
              id={moistureId}
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formData.soilData.moisture || ""}
              onChange={(e) => handleSoilDataChange("moisture", parseFloat(e.target.value))}
              placeholder="15.2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={organicMatterId} className="text-sm font-medium">Organic Matter (%)</label>
            <Input
              id={organicMatterId}
              type="number"
              step="0.1"
              min="0"
              max="20"
              value={formData.soilData.organicMatter || ""}
              onChange={(e) => handleSoilDataChange("organicMatter", parseFloat(e.target.value))}
              placeholder="2.1"
            />
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label htmlFor={textureId} className="text-sm font-medium">Soil Texture</label>
            <select
              id={textureId}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.soilData.texture || ""}
              onChange={(e) => handleSoilDataChange("texture", e.target.value as SoilData['texture'])}
            >
              <option value="">Select soil texture</option>
              <option value="clay">Clay</option>
              <option value="sand">Sand</option>
              <option value="loam">Loam</option>
              <option value="silt">Silt</option>
              <option value="clay-loam">Clay Loam</option>
              <option value="sandy-loam">Sandy Loam</option>
              <option value="silty-loam">Silty Loam</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Crop Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>🌽 Crop Preferences (Optional)</CardTitle>
          <CardDescription>What crops are you interested in growing?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor={preferredCropsId} className="text-sm font-medium">Preferred Crops</label>
            <Input
              id={preferredCropsId}
              type="text"
              value={formData.preferredCrops?.join(", ") || ""}
              onChange={(e) => handleInputChange("preferredCrops", e.target.value.split(", ").filter(Boolean))}
              placeholder="Rice, Wheat, Tomato (comma separated)"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={previousCropsId} className="text-sm font-medium">Previously Grown Crops</label>
            <Input
              id={previousCropsId}
              type="text"
              value={formData.previousCrops?.join(", ") || ""}
              onChange={(e) => handleInputChange("previousCrops", e.target.value.split(", ").filter(Boolean))}
              placeholder="Maize, Beans (comma separated)"
            />
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={loading || !formData.soilData.pH || !formData.soilData.nitrogen}
      >
        {loading ? "Analyzing Soil..." : "Get Recommendations 🚀"}
      </Button>
    </form>
  );
}
