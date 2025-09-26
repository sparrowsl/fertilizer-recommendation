# 🌱 AgriSmart - AI-Powered Crop & Fertilizer Recommendation Platform

A comprehensive agricultural platform that leverages AI to analyze soil data and provide personalized recommendations for optimal crop selection and fertilizer application.

## 🚀 Features

- **📸 AI Image Analysis**: Upload soil test reports and extract data automatically
- **🌾 Smart Crop Recommendations**: Get personalized crop suggestions based on soil conditions
- **🧪 Custom Fertilizer Calculator**: Receive precise NPK ratios and application instructions
- **💰 Budget Planning**: Cost estimates and profitability projections
- **📊 Comprehensive Soil Health Assessment**: Detailed analysis with actionable insights
- **🎯 User-Friendly Interface**: Intuitive forms and visual reports

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: TailwindCSS, shadcn/ui, Lucide React
- **Backend**: Next.js API Routes
- **Image Processing**: Built-in AI analysis simulation
- **Validation**: Custom validation utilities

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern web browser with JavaScript enabled

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd fertilizer-recommendation
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
fertilizer-recommendation/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze-soil/     # Soil analysis API
│   │   │   └── upload-image/     # Image upload API
│   │   ├── dashboard/            # Main dashboard page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   ├── AnalysisResults.tsx  # Results display component
│   │   └── SoilInputForm.tsx    # Main input form
│   ├── lib/
│   │   ├── api.ts               # API utilities
│   │   └── utils.ts             # General utilities
│   └── types/
│       └── index.ts             # TypeScript type definitions
├── public/                      # Static assets
├── package.json
└── README.md
```

## 🔌 API Documentation

### Soil Analysis API

**Endpoint**: `POST /api/analyze-soil`

**Request Body**:
```json
{
  "soilData": {
    "pH": 6.8,
    "nitrogen": 0.8,
    "phosphorus": 0.15,
    "potassium": 0.9,
    "moisture": 15.2,
    "organicMatter": 2.1,
    "texture": "loam",
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060,
      "address": "Farm Address"
    }
  },
  "farmSize": 2.5,
  "budget": 1000,
  "farmingExperience": "intermediate",
  "irrigationAvailable": true,
  "organicFarmingPreference": false
}
```

**Response**:
```json
{
  "success": true,
  "message": "Soil analysis completed successfully",
  "data": {
    "id": "analysis_1234567890",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "soilHealth": {
      "overallScore": 85,
      "deficiencies": ["Low phosphorus levels"],
      "strengths": ["Good nitrogen content", "Optimal pH range"],
      "recommendations": ["Apply phosphate fertilizers"]
    },
    "cropRecommendations": [
      {
        "id": "rice-001",
        "name": "Rice",
        "suitabilityScore": 85,
        "profitabilityRank": 1,
        "estimatedYield": 4.5,
        "marketPrice": 25,
        "estimatedRevenue": 112500,
        "growthPeriod": 120,
        "waterRequirement": "high",
        "seasonality": ["monsoon", "winter"],
        "reasons": ["Clay soil retains water well"]
      }
    ],
    "fertilizerMix": {
      "npkRatio": {
        "nitrogen": 20,
        "phosphorus": 25,
        "potassium": 15
      },
      "applicationRate": 150,
      "estimatedCost": 375,
      "applicationTiming": ["pre-planting", "mid-season"],
      "instructions": ["Apply 70% before planting"]
    },
    "fertilizerProducts": [
      {
        "id": "fert-001",
        "name": "NPK Complex Fertilizer",
        "brand": "AgriGrow",
        "npkRatio": "20-25-15",
        "price": 45,
        "bagSize": 50,
        "availability": "available"
      }
    ],
    "estimatedBudget": {
      "seedCost": 150,
      "fertilizerCost": 375,
      "totalInputCost": 525,
      "estimatedProfit": 112000
    }
  }
}
```

### Image Upload API

**Endpoint**: `POST /api/upload-image`

**Request**: Multipart form data
- `image`: File (JPEG, PNG, WebP)
- `imageType`: String ("soil-test-report", "soil-sample", "field-photo", "crop-photo")
- `latitude`: Number (optional)
- `longitude`: Number (optional)
- `additionalNotes`: String (optional)

**Response**:
```json
{
  "success": true,
  "message": "Image processed successfully",
  "data": {
    "success": true,
    "message": "Image analyzed successfully",
    "data": {
      "extractedData": {
        "pH": 6.8,
        "nitrogen": 0.8,
        "phosphorus": 0.15,
        "potassium": 0.9,
        "organicMatter": 2.1,
        "texture": "loam"
      },
      "confidence": 85,
      "detectedElements": ["pH value", "NPK levels", "organic matter content"],
      "suggestions": ["Soil pH is slightly acidic", "Consider lime application"],
      "needsManualReview": false
    }
  }
}
```

## 🎨 Usage Guide

### 1. Homepage
- Visit the homepage to learn about the platform features
- Click "Get Started" to navigate to the dashboard

### 2. Dashboard - Input Soil Data
- **Option A**: Upload a soil test report image for automatic data extraction
- **Option B**: Enter soil data manually using the form
- Fill in farm information (size, budget, experience level)
- Specify crop preferences (optional)

### 3. Get Recommendations
- Submit the form to receive AI-powered analysis
- Review comprehensive soil health assessment
- Explore crop recommendations ranked by suitability and profitability
- View custom fertilizer mix calculations
- Check budget estimates and profit projections

### 4. Implementation
- Follow the step-by-step fertilizer application instructions
- Use the recommended timing for optimal results
- Track your results and return for future analyses

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: External API configurations
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Customization

- **Crop Database**: Modify crop recommendations in `src/app/api/analyze-soil/route.ts`
- **Fertilizer Products**: Update product listings in the same API file
- **UI Theme**: Customize colors and styling in `src/app/globals.css`
- **Validation Rules**: Adjust validation in `src/lib/api.ts`

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
npx vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual Build

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📈 Future Enhancements

- **Weather API Integration**: Real-time climate data
- **Mobile App**: React Native implementation
- **Marketplace**: Connect farmers with suppliers
- **Advanced ML Models**: More sophisticated crop and fertilizer recommendations
- **Multi-language Support**: Localization for different regions
- **Offline Mode**: PWA functionality for rural areas
- **Regional Analytics**: Dashboard for NGOs and government agencies

## 📄 Data Sources & Accuracy

**Important Disclaimer**: This platform currently uses simulated AI analysis for demonstration purposes. In a production environment, you should integrate with:

- Real soil analysis laboratories
- Weather data providers (OpenWeatherMap, etc.)
- Agricultural databases (USDA, FAO, etc.)
- Local fertilizer supplier APIs
- Current market price feeds

## 🐛 Troubleshooting

### Common Issues

**Image Upload Fails**
- Check file size (must be < 10MB)
- Ensure file format is JPEG, PNG, or WebP
- Verify internet connection

**Form Validation Errors**
- pH must be between 0-14
- NPK values should be realistic percentages
- Farm size must be greater than 0

**API Errors**
- Check browser console for detailed error messages
- Ensure all required fields are filled
- Try refreshing the page and submitting again

## 📞 Support

- **Documentation**: [Project Wiki](#)
- **Issues**: [GitHub Issues](#)
- **Email**: support@agrismart.com
- **Community**: [Discord Server](#)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **TailwindCSS** for the utility-first CSS framework
- **Next.js** team for the amazing React framework
- Agricultural research communities for domain expertise
- Open source contributors and maintainers

---

**Made with ❤️ for sustainable agriculture and farmer empowerment**

🌾 *Helping farmers make informed decisions for better yields and sustainable agriculture*