import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFViewer = ({ pdfUrl }) => (
  <div style={{ width: '100%', height: '400px' }}>
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer fileUrl={pdfUrl} />
    </Worker>
  </div>
);

export default PDFViewer;
