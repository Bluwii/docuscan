import { useState } from 'react';
import { ArrowLeft, RotateCcw, RotateCw, Sun, Contrast, Crop, Download, Mail, Save } from 'lucide-react';

export default function EditDocument({ document, onBack, onSave }) {
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [cropMode, setCropMode] = useState(false);
  const [documentContent, setDocumentContent] = useState(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum
tugate, leoreet eget libero eget, pharetra cursus eros.
Pharetra cursus eros ut enim ad minim veniam.
Donec vitae ultramorper mi. Sed elementum id elit in aliquet.
Aenean nuis illus, pharetra et libero sagittis, malesuada fermentum
lacinia. Phasellus nuis diam finibus torturis laoreet et a quo.
Donec urna nisi, ultricies sed vulputate sit amet, dictum ut orci. Nulla nec
tiarodunt nulla.

I. Donec vitae tincidia eros. Nulla non mi a nibh varius commodo. Nulla
compra, nulla ut nostrud exercitation ullamco laboratori. Ut suscipit
lacinia dictum non proident, quis nostrud exercitation ullamco laboratori.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboratori.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboratori.`);

  const handleRotateLeft = () => {
    setRotation(prev => (prev - 90) % 360);
  };

  const handleRotateRight = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleApplyCrop = () => {
    setCropMode(false);
    // In a real app, this would apply the crop
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...document,
        content: documentContent,
        rotation,
        brightness,
        contrast
      });
    }
    if (onBack) {
      onBack();
    }
  };

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
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold">Edit Document</h1>
              <div className="w-10"></div> {/* Spacer for centering */}
            </div>
          </div>

          {/* Document Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Document Title */}
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {document?.title || 'Contract_Agreement file'}
              </h2>
            </div>

            {/* Document Text Content */}
            <div className="px-5 py-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 min-h-[200px]">
                <textarea
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                  className="w-full h-full resize-none text-sm text-gray-700 leading-relaxed focus:outline-none"
                  rows={12}
                />
              </div>
            </div>

            {/* Editing Tools */}
            <div className="px-5 py-4 space-y-6">
              {/* Rotate */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-gray-600" />
                  <h3 className="font-medium text-sm text-gray-900">Rotate</h3>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleRotateLeft}
                    className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    90° Left
                  </button>
                  <button
                    onClick={handleRotateRight}
                    className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    90° Right
                  </button>
                </div>
              </div>

              {/* Brightness */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-gray-600" />
                  <h3 className="font-medium text-sm text-gray-900">Brightness</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-8">0</span>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-gray-500 w-8">100</span>
                </div>
                <div className="text-center text-xs text-gray-500">
                  Current: {brightness}
                </div>
              </div>

              {/* Contrast */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Contrast className="w-4 h-4 text-gray-600" />
                  <h3 className="font-medium text-sm text-gray-900">Contrast</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-8">0</span>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-gray-500 w-8">100</span>
                </div>
                <div className="text-center text-xs text-gray-500">
                  Current: {contrast}
                </div>
              </div>

              {/* Crop */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Crop className="w-4 h-4 text-gray-600" />
                  <h3 className="font-medium text-sm text-gray-900">Crop</h3>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCropMode(!cropMode)}
                    className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                      cropMode 
                        ? 'bg-black text-white hover:bg-gray-900' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {cropMode ? 'Disable Crop Mode' : 'Enable Crop Mode'}
                  </button>
                  {cropMode && (
                    <button
                      onClick={handleApplyCrop}
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
                    >
                      Apply Crop
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="p-5 bg-white border-t border-gray-200">
            <div className="grid grid-cols-3 gap-3">
              <button className="bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button className="bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button 
                onClick={handleSave}
                className="bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
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
  )
}