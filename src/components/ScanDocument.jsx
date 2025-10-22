import { useState, useRef } from 'react';
import { Camera,ArrowLeft, Upload, X } from 'lucide-react';

export default function ScanDocument({ onBack, onScanComplete }) {
  const [showOCRWarning, setShowOCRWarning] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState('idle'); // 'idle', 'downloading', 'success'
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    if (selectedFile) {
      const newDocument = {
        id: Date.now(),
        title: selectedFile.name,
        date: new Date().toLocaleString(),
        thumbnail: previewUrl
      };
      
      if (onScanComplete) {
        onScanComplete(newDocument);
      }
      
      if (onBack) {
        onBack();
      }
    }
  };

  const handleDownloadOCR = () => {
    setDownloadStatus('downloading');
    
    // Simulate download process
    setTimeout(() => {
      setDownloadStatus('success');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setDownloadStatus('idle');
        setShowOCRWarning(false);
      }, 3000);
    }, 2000);
  };

  // Info SVG Icon
  const InfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.5" d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );

  // Success SVG Icon
  const SuccessIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#059669" stroke-width="1.5"/>
      <path d="M8 12.5L10.5 15L16 9" stroke="#059669" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );

  // Loading Spinner SVG
  const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      {/* iPhone Frame */}
      <div className="relative w-[390px] h-[844px] bg-black rounded-[60px] p-4 shadow-2xl border-[5px] border-black">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[140px] h-[30px] bg-black rounded-b-2xl z-20"></div>
        
        {/* Speaker */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[60px] h-[4px] bg-gray-700 rounded-full z-30"></div>
        
        {/* Screen Content */}
        <div className="w-full h-full bg-white rounded-[50px] overflow-hidden flex flex-col relative">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-5 py-4 mt-10">
            <div className="flex items-center justify-between">
              <button 
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-semibold">Scan Document</h1>
              <div className="w-16"></div> {/* Spacer for centering */}
            </div>
          </div>

          {/* OCR Warning Notification */}
          {showOCRWarning && downloadStatus === 'idle' && (
            <div className="mx-5 mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5">
                <InfoIcon />
              </div>
              <div className="flex-1">
                <p className="text-xs text-blue-800">
                  <span className="font-medium">OCR module not installed.</span> Download it to enable text recognition?
                </p>
              </div>
              <button 
                onClick={() => setShowOCRWarning(false)}
                className="text-blue-600 hover:text-blue-800 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Download OCR Button */}
          {showOCRWarning && downloadStatus === 'idle' && (
            <div className="mx-5 mt-2">
              <button 
                onClick={handleDownloadOCR}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold text-sm hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
              >
               
                Download OCR Module
              </button>
            </div>
          )}

          {/* Downloading Progress */}
          {downloadStatus === 'downloading' && (
            <div className="mx-5 mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2">
              <div className="flex-shrink-0">
                <LoadingSpinner />
              </div>
              <div className="flex-1">
                <p className="text-xs text-blue-800 font-medium">
                  Downloading OCR Module...
                </p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {downloadStatus === 'success' && (
            <div className="mx-5 mt-4 bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5">
                <SuccessIcon />
              </div>
              <div className="flex-1">
                <p className="text-xs text-green-800 font-medium">
                  OCR downloaded successfully and ready!
                </p>
              </div>
              <button 
                onClick={() => setDownloadStatus('idle')}
                className="text-green-600 hover:text-green-800 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Preview Area */}
          <div className="flex-1 px-5 py-4 flex items-center justify-center">
            {previewUrl ? (
              <div className="relative w-full h-full bg-gray-100 rounded-xl overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <Camera className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No document selected</p>
                <p className="text-xs mt-1">Capture or upload a file</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-5 bg-white border-t border-gray-200 space-y-3">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Save Button (only show if file selected) */}
            {previewUrl && (
              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
              >
                Save Document
              </button>
            )}

            {/* Capture and Upload Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCapture}
                className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors shadow-lg"
              >
                <Camera className="w-5 h-5" />
                Capture
              </button>
              <button
                onClick={handleUpload}
                className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors border border-gray-300"
              >
                Upload
              </button>
            </div>

            <p className="text-center text-xs text-gray-500">
              {selectedFile ? selectedFile.name : 'Choose File No File Chosen'}
            </p>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-gray-400 rounded-full"></div>
        </div>
        
        {/* Power Button */}
        <div className="absolute right-[-4px] top-24 w-[4px] h-[80px] bg-gray-800 rounded-r"></div>
        
        {/* Volume Buttons */}
        <div className="absolute left-[-4px] top-24 w-[4px] h-[40px] bg-gray-800 rounded-l"></div>
        <div className="absolute left-[-4px] top-32 w-[4px] h-[40px] bg-gray-800 rounded-l"></div>
      </div>
    </div>
  );
}