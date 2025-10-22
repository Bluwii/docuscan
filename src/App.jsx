import { useState } from 'react';
import Home from './components/Home';
import ScanDocument from './components/ScanDocument';
import ManageFolders from './components/ManageFolders';
import EditDocument from './components/EditDocument';
import './App.css';

function App() {
  // State to control which screen to show
  const [currentScreen, setCurrentScreen] = useState('home');
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Contract_Agreement.pdf',
      date: 'Yesterday, 3:45 PM',
      type: 'pdf'
    },
    {
      id: 2,
      title: 'Invoice_2024.pdf',
      date: 'Yesterday, 2:30 PM',
      type: 'pdf'
    },
    {
      id: 3,
      title: 'Meeting_Notes.docx',
      date: 'Oct 20, 2025',
      type: 'doc'
    },
    {
      id: 4,
      title: 'Receipt_Store.jpg',
      date: 'Oct 19, 2025',
      type: 'image'
    }
  ]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // NAVIGATION HANDLERS
  
  // Navigate to Home
  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  // Navigate to Scan Document
  const navigateToScanDocument = () => {
    setCurrentScreen('scanDocument');
  };

  // Navigate to Manage Folders (Settings)
  const navigateToManageFolders = () => {
    setCurrentScreen('manageFolders');
  };

  // Navigate to Edit Document
  const navigateToEditDocument = (document) => {
    setSelectedDocument(document);
    setCurrentScreen('editDocument');
  };

  // Handle when a new document is scanned
  const handleScanComplete = (newDocument) => {
    setDocuments(prevDocuments => [newDocument, ...prevDocuments]);
    navigateToHome();
  };

  // Handle document save
  const handleDocumentSave = (updatedDocument) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === updatedDocument.id ? updatedDocument : doc
    ));
    navigateToHome();
  };

  // RENDER SCREENS BASED ON CURRENT STATE
  if (currentScreen === 'home') {
    return (
      <Home 
        documents={documents}
        onNavigateToSettings={navigateToManageFolders}
        onNavigateToDocumentView={navigateToEditDocument}
        onNavigateToScanDocument={navigateToScanDocument}
      />
    );
  }

  if (currentScreen === 'scanDocument') {
    return (
      <ScanDocument 
        onBack={navigateToHome}
        onScanComplete={handleScanComplete}
      />
    );
  }

  if (currentScreen === 'manageFolders') {
    return (
      <ManageFolders 
        onBack={navigateToHome}
        onNavigateToEditDocument={navigateToEditDocument}
      />
    );
  }

  if (currentScreen === 'editDocument') {
    return (
      <EditDocument 
        document={selectedDocument}
        onBack={navigateToHome}
        onSave={handleDocumentSave}
      />
    );
  }

  // Default fallback
  return (
    <Home 
      documents={documents}
      onNavigateToSettings={navigateToManageFolders}
      onNavigateToDocumentView={navigateToEditDocument}
      onNavigateToScanDocument={navigateToScanDocument}
    />
  );
}

export default App;