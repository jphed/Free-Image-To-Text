class ImageToTextApp {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.currentImageData = null;
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.uploadContent = document.getElementById('uploadContent');
        this.imagePreview = document.getElementById('imagePreview');
        this.previewImg = document.getElementById('previewImg');
        this.removeImage = document.getElementById('removeImage');
        this.pasteBtn = document.getElementById('pasteBtn');
        this.processBtn = document.getElementById('processBtn');
        this.processText = document.getElementById('processText');
        this.loadingText = document.getElementById('loadingText');
        this.resultsSection = document.getElementById('resultsSection');
        this.extractedText = document.getElementById('extractedText');
        this.errorSection = document.getElementById('errorSection');
        this.errorMessage = document.getElementById('errorMessage');
        this.copyBtn = document.getElementById('copyBtn');
    }

    setupEventListeners() {
        // File upload events
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        this.removeImage.addEventListener('click', () => this.removeCurrentImage());

        // Paste functionality
        this.pasteBtn.addEventListener('click', () => this.handlePaste());

        // Process button
        this.processBtn.addEventListener('click', () => this.processImage());

        // Copy button
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('border-blue-400', 'bg-blue-500', 'bg-opacity-20');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('border-blue-400', 'bg-blue-500', 'bg-opacity-20');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('border-blue-400', 'bg-blue-500', 'bg-opacity-20');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.handleFile(file);
        }
    }

    handleFile(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('Please select a valid image file.');
            return;
        }

        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            this.showError('File size must be less than 10MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImageData = e.target.result;
            this.showImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    showImagePreview(imageData) {
        this.previewImg.src = imageData;
        this.uploadContent.classList.add('hidden');
        this.imagePreview.classList.remove('hidden');
        this.hideError();
    }

    removeCurrentImage() {
        this.currentImageData = null;
        this.fileInput.value = '';
        this.uploadContent.classList.remove('hidden');
        this.imagePreview.classList.add('hidden');
        this.hideResults();
        this.hideError();
    }

    async handlePaste() {
        try {
            const clipboardItems = await navigator.clipboard.read();
            
            for (const clipboardItem of clipboardItems) {
                for (const type of clipboardItem.types) {
                    if (type.startsWith('image/')) {
                        const blob = await clipboardItem.getType(type);
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.currentImageData = e.target.result;
                            this.showImagePreview(e.target.result);
                        };
                        reader.readAsDataURL(blob);
                        return;
                    }
                }
            }
            
            this.showError('No image found in clipboard. Please copy an image first.');
        } catch (error) {
            console.error('Paste error:', error);
            this.showError('Unable to access clipboard. Please try uploading a file instead.');
        }
    }

    async processImage() {
        if (!this.currentImageData) {
            this.showError('Please select or paste an image first.');
            return;
        }

        this.setLoading(true);
        this.hideError();
        this.hideResults();

        try {
            const response = await fetch('/api/ocr-base64', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageData: this.currentImageData
                })
            });

            const data = await response.json();

            if (data.success) {
                this.showResults(data.text);
            } else {
                this.showError(data.error || 'Failed to process image.');
            }
        } catch (error) {
            console.error('Processing error:', error);
            this.showError('Network error. Please check your connection and try again.');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(loading) {
        this.processBtn.disabled = loading;
        if (loading) {
            this.processText.classList.add('hidden');
            this.loadingText.classList.remove('hidden');
        } else {
            this.processText.classList.remove('hidden');
            this.loadingText.classList.add('hidden');
        }
    }

    showResults(text) {
        this.extractedText.value = text;
        this.resultsSection.classList.remove('hidden');
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    hideResults() {
        this.resultsSection.classList.add('hidden');
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorSection.classList.remove('hidden');
        this.errorSection.scrollIntoView({ behavior: 'smooth' });
    }

    hideError() {
        this.errorSection.classList.add('hidden');
    }

    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.extractedText.value);
            
            // Visual feedback
            const originalText = this.copyBtn.textContent;
            this.copyBtn.textContent = '✅ Copied!';
            this.copyBtn.classList.add('bg-green-600');
            
            setTimeout(() => {
                this.copyBtn.textContent = originalText;
                this.copyBtn.classList.remove('bg-green-600');
            }, 2000);
        } catch (error) {
            console.error('Copy error:', error);
            this.showError('Failed to copy text to clipboard.');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageToTextApp();
});

// Add some fun animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add floating animation to the main container
    const mainContainer = document.querySelector('.glass-effect');
    if (mainContainer) {
        mainContainer.style.animation = 'float 6s ease-in-out infinite';
    }

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .neon-border:hover {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        
        .glass-effect:hover {
            background: rgba(255, 255, 255, 0.15);
        }
    `;
    document.head.appendChild(style);
});
