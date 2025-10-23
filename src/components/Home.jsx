import { useState } from 'react';
import { FileText, Search, Grid, List, Settings, Scan, ChevronDown, Folder } from 'lucide-react';

export default function Home({ 
  documents = [], 
  onNavigateToSettings, 
  onNavigateToDocumentView,
  onNavigateToScanDocument 
}) {
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dropdown states
  const [showFolderDropdown, setShowFolderDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('All Document');
  const [selectedSort, setSelectedSort] = useState('Newest First');

  // Folders with documents data
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
    },
    { 
      id: 2, 
      name: 'Work', 
      documentCount: 2,
      documents: [
        { id: 1, title: 'Contract_Agreement.pdf', date: 'Yesterday, 3:45 PM', type: 'pdf' },
        { id: 2, title: 'Invoice_2024.pdf', date: 'Yesterday, 2:30 PM', type: 'pdf' }
      ]
    },
    { 
      id: 3, 
      name: 'Personal', 
      documentCount: 2,
      documents: [
        { id: 3, title: 'Meeting_Notes.docx', date: 'Oct 20, 2025', type: 'doc' },
        { id: 4, title: 'Receipt_Store.jpg', date: 'Oct 19, 2025', type: 'image' }
      ]
    }
  ]);

  // Sort options
  const sortOptions = ['Newest First', 'Oldest First', 'A-Z'];

  // Get current folder documents
  const currentFolder = folders.find(folder => folder.name === selectedFolder);
  const currentDocuments = currentFolder ? currentFolder.documents : [];

  const handleScanNew = () => {
    if (onNavigateToScanDocument) {
      onNavigateToScanDocument();
    }
  };

  const handleFolderSelect = (folderName) => {
    setSelectedFolder(folderName);
    setShowFolderDropdown(false);
  };

  const handleSortSelect = (sort) => {
    setSelectedSort(sort);
    setShowSortDropdown(false);
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

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      {/* iPhone Frame */}
      <div className="relative w-[390px] h-[844px] bg-black rounded-[60px] p-4 shadow-2xl border-[5px] border-black">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[140px] h-[30px] bg-black rounded-b-2xl z-20"></div>
        
        {/* Speaker */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[60px] h-[4px] bg-gray-700 rounded-full z-30"></div>
        
        {/* Screen Content */}
        <div className="w-full h-full bg-gray-50 rounded-[50px] overflow-hidden flex flex-col relative">
          {/* App Content */}
          <div className="flex-1 flex flex-col mt-10">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src="/src/assets/images/logo.png" 
                    alt="DocuScan Logo" 
                    className="w-5 h-5 object-contain"
                  />
                  <h1 className="text-xl font-semibold">DocuScan</h1>
                </div>
                <button 
                  onClick={onNavigateToSettings}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Search Bar with View Toggle */}
            <div className="px-5 py-3 bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>
                
                {/* View Toggle Buttons */}
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="px-5 py-3 bg-white border-b border-gray-200">
              <div className="flex gap-2 relative">
                {/* Folder Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => {
                      setShowFolderDropdown(!showFolderDropdown);
                      setShowSortDropdown(false);
                    }}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-[12px] font-medium hover:bg-gray-50 transition-colors flex items-center gap-1"
                  >
                    {selectedFolder}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showFolderDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {folders.map((folder) => (
                        <button
                          key={folder.id}
                          onClick={() => handleFolderSelect(folder.name)}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                            selectedFolder === folder.name ? 'bg-gray-100 font-medium' : ''
                          } ${
                            folder === folders[0] ? 'rounded-t-lg' : 
                            folder === folders[folders.length - 1] ? 'rounded-b-lg' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Folder className="w-4 h-4 text-gray-600" />
                            {folder.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => {
                      setShowSortDropdown(!showSortDropdown);
                      setShowFolderDropdown(false);
                    }}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-[12px] font-medium hover:bg-gray-50 transition-colors flex items-center gap-1"
                  >
                    {selectedSort}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showSortDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {sortOptions.map((sort) => (
                        <button
                          key={sort}
                          onClick={() => handleSortSelect(sort)}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                            selectedSort === sort ? 'bg-gray-100 font-medium' : ''
                          } ${
                            sort === sortOptions[0] ? 'rounded-t-lg' : 
                            sort === sortOptions[sortOptions.length - 1] ? 'rounded-b-lg' : ''
                          }`}
                        >
                          {sort}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Document List/Grid */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {currentDocuments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <FileText className="w-16 h-16 mb-3" />
                  <p className="text-sm">No documents found</p>
                  <p className="text-xs mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <>
                  {/* LIST VIEW */}
                  {viewMode === 'list' && (
                    <div className="space-y-3">
                      {currentDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => onNavigateToDocumentView(doc)}
                          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
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

                  {/* GRID VIEW */}
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-2 gap-3">
                      {currentDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => onNavigateToDocumentView(doc)}
                          className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                              {getFileIcon(doc.type)}
                            </div>
                            <h3 className="font-medium text-xs text-gray-900 truncate w-full">
                              {doc.title}
                            </h3>
                            <p className="text-[10px] text-gray-500 mt-1">{doc.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Scan Button */}
            <div className="p-5 bg-white border-t border-gray-200">
              <button
                onClick={handleScanNew}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors shadow-lg"
              >
                <img 
                  src="/src/assets/images/logos.png" 
                  alt="DocuScan Logo" 
                  className="w-5 h-5 object-contain"
                />
                Scan New Document
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
  );
}