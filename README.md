# 🌱 AI-Powered Fertilizer Recommendation Platform

A streamlined, single-page application that provides AI-powered crop and fertilizer recommendations based on soil analysis and image processing.

## Features

### 📸 **Smart Image Analysis**
- Upload soil test report images
- AI-powered text extraction using Hugging Face Transformers
- Automatic soil parameter detection (pH, N, P, K)
- Support for JPEG, PNG, and WebP formats

### 🧪 **Soil Analysis**
- Manual soil parameter entry
- Intelligent recommendations based on soil chemistry
- pH, Nitrogen, Phosphorus, and Potassium analysis
- Real-time form validation

### 🌾 **Crop Recommendations**
- AI-generated crop suitability scores
- Expected yield estimates
- Personalized recommendations based on soil conditions
- Support for various crop types

### 🧪 **Fertilizer Guidance**
- Custom NPK ratio calculations
- Application quantity recommendations
- Cost estimations
- Soil health improvement suggestions

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **AI/ML**: Hugging Face Transformers
- **UI**: shadcn/ui components with Tailwind CSS
- **Image Processing**: Browser-based AI models

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # App layout
│   └── globals.css       # Global styles
├── components/ui/        # Reusable UI components
├── lib/
│   ├── imageUtils.ts     # Image processing utilities
│   └── utils.ts          # General utilities
└── types/
    └── index.ts          # TypeScript definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- 4GB+ RAM (for AI model processing)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fertilizer-recommendation

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Usage

1. **Upload Image** (Optional)
   - Click "Choose File" to upload a soil test report
   - Wait for AI analysis to extract soil parameters
   - Review auto-populated data

2. **Enter Soil Data**
   - Manually enter pH, nitrogen, phosphorus, and potassium values
   - All fields are optional but improve recommendation accuracy

3. **Get Recommendations**
   - Click "Get Smart Recommendations"
   - View personalized crop suggestions
   - See fertilizer recommendations and soil health assessment

## AI Models

The application uses the following Hugging Face models:

- **Image-to-Text**: `Xenova/vit-gpt2-image-captioning`
  - Extracts text content from soil test images
  - Identifies numerical values and chemical parameters

- **Object Detection**: `Xenova/detr-resnet-50`
  - Detects regions of interest in documents
  - Helps focus text extraction on relevant areas

## Key Components

### Image Processing (`src/lib/imageUtils.ts`)

- `analyzeImageForSoilData()` - Main image analysis function
- `extractTextFromImage()` - AI-powered text extraction
- `parseSoilDataFromText()` - Regex-based parameter parsing
- `validateSoilData()` - Input validation and sanitization

### Recommendation Engine (`src/app/page.tsx`)

- Soil health assessment based on pH and nutrient levels
- Crop suitability scoring algorithm
- Dynamic fertilizer ratio calculations
- Cost estimation based on nutrient requirements

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

*Note: AI models run in the browser and may require significant memory*

## Performance

- Initial model loading: 2-5 seconds
- Image analysis: 3-8 seconds
- Recommendation generation: <1 second

Models are cached after first load for improved performance.

## Development

### Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

### Code Structure

- **Single Page App**: Everything runs on one route (`/`)
- **Client-Side AI**: Models run entirely in the browser
- **No Backend**: No server-side API routes required
- **Type Safety**: Full TypeScript implementation

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms

The app is a static Next.js application and can be deployed to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## Limitations

- **Model Size**: AI models are ~100-300MB (cached after first load)
- **Browser Only**: No server-side processing
- **OCR Accuracy**: Text extraction depends on image quality
- **Mock Data**: Some recommendations use simplified algorithms

## Future Enhancements

- [ ] Real weather data integration
- [ ] Advanced OCR with dedicated text recognition models
- [ ] Offline PW
A support
- [ ] Multi-language text extraction
- [ ] Regional crop databases
- [ ] Cost data from agricultural markets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:
- Create an issue in the GitHub repository
- Check the troubleshooting section below

## Troubleshooting

### Common Issues

**Models not loading**
- Check browser memory (need 4GB+ available)
- Clear browser cache and reload
- Try a different browser

**Image analysis failing**
- Ensure image is clear and well-lit
- Use JPEG, PNG, or WebP format
- Keep file size under 10MB

**Poor text extraction**
- Use high-resolution images
- Ensure text is clearly visible
- Try different lighting/contrast

---

Built with ❤️ for farmers worldwide 🌍