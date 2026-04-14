/**
 * Parse a CSV string into an array of objects.
 * Handles quoted fields, embedded commas, and newlines within quotes.
 */
export function parseCsv(csvString) {
    const lines = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < csvString.length; i++) {
        const ch = csvString[i];

        if (inQuotes) {
            if (ch === '"') {
                if (i + 1 < csvString.length && csvString[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                current += ch;
            }
        } else if (ch === '"') {
            inQuotes = true;
        } else if (ch === '\n') {
            lines.push(current);
            current = '';
        } else if (ch === '\r') {
            // skip, \n follows
        } else {
            current += ch;
        }
    }

    if (current.length > 0) {
        lines.push(current);
    }

    if (lines.length < 2) {
        return { headers: [], rows: [] };
    }

    const splitRow = (line) => {
        const fields = [];
        let field = '';
        let quoted = false;

        for (let i = 0; i < line.length; i++) {
            const ch = line[i];

            if (quoted) {
                if (ch === '"') {
                    if (i + 1 < line.length && line[i + 1] === '"') {
                        field += '"';
                        i++;
                    } else {
                        quoted = false;
                    }
                } else {
                    field += ch;
                }
            } else if (ch === '"') {
                quoted = true;
            } else if (ch === ',') {
                fields.push(field.trim());
                field = '';
            } else {
                field += ch;
            }
        }

        fields.push(field.trim());
        return fields;
    };

    const headers = splitRow(lines[0]).map((h) => h.toLowerCase().replace(/\s+/g, '_'));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = splitRow(lines[i]);
        const row = {};

        for (let j = 0; j < headers.length; j++) {
            row[headers[j]] = j < values.length ? values[j] : '';
        }

        rows.push(row);
    }

    return { headers, rows };
}

export function stringifyCsvValue(value) {
    if (value === null || value === undefined) {
        return '';
    }

    let normalized = value;

    if (normalized instanceof Date) {
        normalized = normalized.toISOString();
    } else if (typeof normalized === 'object') {
        normalized = JSON.stringify(normalized);
    }

    const stringValue = String(normalized);
    const escaped = stringValue.replace(/"/g, '""');

    if (/[",\n\r]/.test(escaped)) {
        return `"${escaped}"`;
    }

    return escaped;
}

export function toCsv(rows, columns) {
    const normalizedColumns = columns.map((column) => {
        if (typeof column === 'string') {
            return {
                header: column,
                value: (row) => row[column]
            };
        }

        return {
            header: column.header,
            value: column.value
        };
    });

    const headerRow = normalizedColumns
        .map((column) => stringifyCsvValue(column.header))
        .join(',');

    const dataRows = rows.map((row) => normalizedColumns
        .map((column) => stringifyCsvValue(column.value(row)))
        .join(','));

    return [headerRow, ...dataRows].join('\n');
}

export function toExcelTable(rows, columns, sheetName = 'Report') {
    const normalizedColumns = columns.map((column) => {
        if (typeof column === 'string') {
            return {
                header: column,
                value: (row) => row[column]
            };
        }

        return {
            header: column.header,
            value: column.value
        };
    });

    const escapeHtml = (value) => {
        if (value === null || value === undefined) {
            return '';
        }

        let normalized = value;

        if (normalized instanceof Date) {
            normalized = normalized.toISOString();
        } else if (typeof normalized === 'object') {
            normalized = JSON.stringify(normalized);
        }

        return String(normalized)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    const headerCells = normalizedColumns
        .map((column) => `<th>${escapeHtml(column.header)}</th>`)
        .join('');
    const bodyRows = rows
        .map((row) => `<tr>${normalizedColumns
            .map((column) => `<td>${escapeHtml(column.value(row))}</td>`)
            .join('')}</tr>`)
        .join('');

    return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <meta name="ProgId" content="Excel.Sheet" />
  <meta name="Generator" content="Suprema HR Integration" />
  <title>${escapeHtml(sheetName)}</title>
</head>
<body>
  <table border="1">
    <thead>
      <tr>${headerCells}</tr>
    </thead>
    <tbody>
      ${bodyRows}
    </tbody>
  </table>
</body>
</html>`;
}