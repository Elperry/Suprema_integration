import { useState, useRef, useCallback } from 'react';
import { userAPI } from '../services/api';

const TEMPLATE_CSV = `employee_id,employee_name,card_data,card_type,notes
EMP001,John Doe,0102030405060708091011121314151617181920212223242526272829303132,CSN,New hire
EMP002,Jane Smith,AABBCCDD00112233445566778899AABB00112233445566778899AABBCCDDEEFF,CSN,Transfer`;

export default function BulkImport() {
  const [csvText, setCsvText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Please select a .csv file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setCsvText(ev.target.result);
      setError(null);
      setResult(null);
    };
    reader.readAsText(file);
  };

  const processDroppedFile = useCallback((file) => {
    if (!file.name.endsWith('.csv')) {
      setError('Please drop a .csv file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCsvText(ev.target.result);
      setError(null);
      setResult(null);
    };
    reader.readAsText(file);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      processDroppedFile(files[0]);
    }
  }, [processDroppedFile]);

  const handleValidate = async () => {
    if (!csvText.trim()) {
      setError('Please provide CSV data');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await userAPI.importCsv(csvText, true);
      setResult({ ...res.data, mode: 'validate' });
    } catch (err) {
      setError(err.response?.data?.message || err.userMessage || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!csvText.trim()) {
      setError('Please provide CSV data');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await userAPI.importCsv(csvText, false);
      setResult({ ...res.data, mode: 'import' });
    } catch (err) {
      setError(err.response?.data?.message || err.userMessage || err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob([TEMPLATE_CSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'import_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bulk-import" style={{ padding: 20 }}>
      <h2>Bulk User Import</h2>
      <p style={{ color: '#888', marginBottom: 16 }}>
        Import card assignments from a CSV file. Required columns: <code>employee_id</code>, <code>employee_name</code>, <code>card_data</code>. Optional: <code>card_type</code>, <code>notes</code>.
      </p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <button onClick={downloadTemplate} style={btnStyle}>
          Download Template
        </button>
        <button onClick={() => fileRef.current?.click()} style={btnStyle}>
          Upload CSV File
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>

      {/* Drag-and-Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? '#2563eb' : '#cbd5e1'}`,
          borderRadius: 10,
          padding: '32px 20px',
          textAlign: 'center',
          backgroundColor: dragOver ? '#eff6ff' : '#f8fafc',
          cursor: 'pointer',
          transition: 'all .2s',
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>{dragOver ? '⬇️' : '📂'}</div>
        <div style={{ fontSize: 14, color: '#475569', fontWeight: 500 }}>
          {dragOver ? 'Drop CSV file here' : 'Drag & drop a CSV file here, or click to browse'}
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Accepts .csv files</div>
      </div>

      <textarea
        value={csvText}
        onChange={(e) => { setCsvText(e.target.value); setResult(null); }}
        rows={10}
        placeholder="Paste CSV data here or upload a file..."
        style={{
          width: '100%',
          fontFamily: 'monospace',
          fontSize: 13,
          padding: 12,
          border: '1px solid var(--border-color, #e2e8f0)',
          borderRadius: 6,
          backgroundColor: '#f8fafc',
          color: '#1e293b',
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button onClick={handleValidate} disabled={loading || !csvText.trim()} style={{ ...btnStyle, backgroundColor: '#2563eb' }}>
          {loading ? 'Processing...' : 'Validate'}
        </button>
        <button onClick={handleImport} disabled={loading || !csvText.trim()} style={{ ...btnStyle, backgroundColor: '#16a34a' }}>
          {loading ? 'Processing...' : 'Import'}
        </button>
      </div>

      {error && (
        <div style={{ marginTop: 16, padding: 12, backgroundColor: '#fee2e2', borderRadius: 6, color: '#991b1b', border: '1px solid #fca5a5' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>{result.mode === 'validate' ? 'Validation Results (Dry Run)' : 'Import Results'}</h3>

          <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
            <StatCard label="Total Rows" value={result.summary.total} color="#3b82f6" />
            <StatCard label={result.dryRun ? 'Valid' : 'Created'} value={result.summary.created} color="#22c55e" />
            <StatCard label="Skipped" value={result.summary.skipped} color="#eab308" />
            <StatCard label="Errors" value={result.summary.errors} color="#ef4444" />
          </div>

          {result.results && result.results.length > 0 && (
            <div style={{ maxHeight: 400, overflowY: 'auto', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: 6 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9', position: 'sticky', top: 0 }}>
                    <th style={thStyle}>Row</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={tdStyle}>{r.row}</td>
                      <td style={tdStyle}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontSize: 12,
                          backgroundColor: r.status === 'created' || r.status === 'valid' ? '#166534'
                            : r.status === 'skipped' ? '#854d0e'
                            : '#991b1b',
                          color: '#fff',
                        }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={tdStyle}>{r.message || r.employeeName || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      padding: '12px 20px',
      backgroundColor: '#f8fafc',
      borderRadius: 8,
      borderLeft: `4px solid ${color}`,
      minWidth: 100,
      border: '1px solid #e2e8f0',
      borderLeftWidth: 4,
      borderLeftColor: color,
    }}>
      <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
      <div style={{ fontSize: 12, color: '#64748b' }}>{label}</div>
    </div>
  );
}

const btnStyle = {
  padding: '8px 16px',
  border: '1px solid #e2e8f0',
  borderRadius: 6,
  backgroundColor: '#f1f5f9',
  color: '#334155',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
};

const thStyle = { padding: '8px 12px', textAlign: 'left', color: '#475569', fontWeight: 600 };
const tdStyle = { padding: '8px 12px', color: '#1e293b' };
