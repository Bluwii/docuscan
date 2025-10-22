import { useState } from 'react';
import { Plus, Folder, Check, ArrowLeft, FileText } from 'lucide-react';

export default function ManageFolders({ onBack, onNavigateToEditDocument }) {
  const [folders, setFolders] = useState([
    { 
      id: 1, 
      name: 'All Document', 
      documentCount: 4,
      documents: [
        { id: 1, title: 'Contract_Agreement.pdf', date: 'Yesterday, 3:45 PM', type: 'pdf' },
        { id: 2, title: 'Invoice_2024.pdf', date: 'Yesterday, 2:30 PM', type: 'pdf' },
        { id: 3, title: 'Meeting_Notes.docx', date: 'Oct 20, 2025', type: 'doc' },
        { id: 4, title: 'Receipt_Store.jpg', date: 'Oct 19, 2025', type: 'image' }
      ]
    }
  ]);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: folders.length + 1,
        name: newFolderName,
        documentCount: 0,
        documents: []
      };
      
      setFolders(prev => [...prev, newFolder]);
      setNewFolderName('');
      setShowCreateFolder(false);
      
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    }
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
  };

  const handleDocumentClick = (document) => {
    if (onNavigateToEditDocument) {
      onNavigateToEditDocument(document);
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'doc':
        return <FileText className="w-6 h-6 text-blue-500" />;
      case 'image':
        return <FileText className="w-6 h-6 text-green-500" />;
      default:
        return <FileText className="w-6 h-6 text-gray-600" />;
    }
  };

  // Folder Details View
  if (selectedFolder) {
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
                  onClick={handleBackToFolders}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-semibold">{selectedFolder.name}</h1>
                <div className="w-10"></div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-1">
                {selectedFolder.documentCount} Document{selectedFolder.documentCount !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Document List */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {selectedFolder.documents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <FileText className="w-16 h-16 mb-3" />
                  <p className="text-sm">No documents in this folder</p>
                  <p className="text-xs mt-1">Scan a document to add it here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedFolder.documents.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => handleDocumentClick(doc)}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer active:bg-gray-50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-gray-900 truncate">
                            {doc.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">{doc.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Main Folders List View
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
              <h1 className="text-xl font-semibold">Manage Folders</h1>
              <div className="w-10"></div>
            </div>
          </div>

          {/* Create Folder Button */}
          <div className="p-5 border-b border-gray-200">
            <button
              onClick={() => setShowCreateFolder(true)}
              className="w-full bg-black text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create New Folder
            </button>
          </div>

          {/* Folder List */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-3">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  onClick={() => handleFolderClick(folder)}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer active:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Folder className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-gray-900">
                          {folder.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {folder.documentCount} Document{folder.documentCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create Folder Modal */}
          {showCreateFolder && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-5 z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
                <h2 className="text-xl font-semibold text-center mb-2">Create New Folder</h2>
                <p className="text-sm text-gray-500 text-center mb-6">Enter Folder Name</p>
                
                <input
                  type="text"
                  placeholder="Enter folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-gray-300 text-center"
                  autoFocus
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreateFolder(false)}
                    className="flex-1 py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateFolder}
                    className="flex-1 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Popup */}
          {showSuccessPopup && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white rounded-xl p-4 flex items-center gap-2 shadow-lg z-50">
              <Check className="w-5 h-5" />
              <span className="font-medium">Folder Created</span>
            </div>
          )}

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