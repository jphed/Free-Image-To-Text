# Free Image to Text - OCR Web Application

A modern web application that converts images to text using advanced OCR technology. Built with Node.js, Express.js, and Tailwind CSS, featuring a futuristic user interface with smooth animations and responsive design.

## Features

- **Image Upload**: Drag & drop or click to upload images
- **Clipboard Support**: Paste images directly from clipboard
- **AI-Powered OCR**: Uses Tesseract.js for accurate text extraction
- **Modern UI**: Beautiful gradient backgrounds and glass morphism effects
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Processing**: Fast and efficient text extraction
- **One-Click Copy**: Easy text copying to clipboard
- **Smooth Animations**: Optimized 60fps animations with accessibility support

## Tech Stack

- **Backend**: Node.js, Express.js
- **OCR Engine**: Tesseract.js
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **File Handling**: Multer
- **Styling**: Custom CSS with optimized animations
- **Deployment**: Render.com ready

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

3. **Open Your Browser**
   Navigate to `http://localhost:3000`

## Usage

1. **Upload an Image**:
   - Click the upload area or drag & drop an image
   - Supported formats: JPG, PNG, GIF, BMP, WebP
   - Maximum file size: 10MB

2. **Paste from Clipboard**:
   - Copy an image to your clipboard
   - Click the "Paste Image" button

3. **Process the Image**:
   - Click "Process Image" to extract text
   - Wait for the OCR processing to complete

4. **Copy the Results**:
   - View the extracted text in the results area
   - Click "Copy Text" to copy to clipboard

## Design Features

- **Gradient Backgrounds**: Animated gradient backgrounds with smooth transitions
- **Glass Morphism**: Modern glass-effect containers with backdrop blur
- **Neon Borders**: Glowing borders and interactive effects
- **Smooth Animations**: Floating and pulsing animations with cubic-bezier curves
- **Responsive Layout**: Adapts to all screen sizes and devices
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Reduced motion support for users with motion sensitivity

## API Endpoints

- `GET /` - Serves the main application
- `POST /api/ocr-upload` - Process uploaded image files
- `POST /api/ocr-base64` - Process base64 image data

## Performance Optimizations

- **60fps Animations**: Optimized CSS transitions with `will-change` properties
- **Cubic-bezier Curves**: Natural feeling animations with proper timing
- **Reduced Motion Support**: Respects user accessibility preferences
- **Efficient OCR Processing**: Fast text extraction with Tesseract.js
- **Memory Management**: Automatic cleanup of uploaded files

## Deployment

The application is configured for easy deployment to Render.com:

1. Connect your GitHub repository to Render
2. Select "Web Service" and choose Node.js
3. The application will automatically build and deploy
4. No additional configuration required

## Development

### Project Structure
```
├── server.js          # Express server with OCR endpoints
├── package.json       # Dependencies and scripts
├── render.yaml        # Render deployment configuration
├── public/
│   ├── index.html     # Main application interface
│   └── script.js      # Frontend JavaScript functionality
└── uploads/           # Temporary file storage (auto-created)
```

### Key Dependencies
- `express`: Web framework
- `tesseract.js`: OCR engine
- `multer`: File upload handling
- `cors`: Cross-origin resource sharing

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Created by [Jorge Parra](https://github.com/jphed) using modern web technologies**