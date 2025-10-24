function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function buildDocHTML(form) {
  const dataRows = (form.dataRows || []).map(
    r => `<tr><td>${esc(r.parameter)}</td><td>${esc(r.value)}</td><td>${esc(r.unit)}</td></tr>`
  ).join('')

  const style = `
    <style>
      body { font-family: 'Times New Roman', Times, serif; color: #111827; }
      .page { width: 210mm; min-height: 297mm; padding: 20mm 18mm; margin: auto; background: white; }
      h1,h2,h3 { margin: 0 0 6px; }
      .center { text-align: center; }
      .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; font-size: 12pt; margin-top: 8px; }
      .sec { margin-top: 12pt; }
      .sec h3 { font-size: 13pt; margin-bottom: 4pt; }
      .content { white-space: pre-wrap; line-height: 1.4; font-size: 12pt; }
      table { width: 100%; border-collapse: collapse; font-size: 12pt; }
      th, td { border: 1px solid #cbd5e1; padding: 6px; }
      thead { background: #f8fafc; }
      .sign { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18pt; font-size: 12pt; }
      @page { margin: 20mm 18mm; }
    </style>
  `

  const header = `
    <div class="center">
      <h2 style="font-size: 16pt; font-weight: 700;">${esc(form.university || 'RUET')}</h2>
      <div style="font-size: 12pt;">Department: ${esc(form.department || '')}</div>
      <div style="font-size: 12pt;">Course: ${esc(form.courseTitle || '')} (${esc(form.courseCode || '')})</div>
    </div>
  `

  const meta = `
    <div class="meta">
      <div><strong>Student:</strong> ${esc(form.studentName || '')}</div>
      <div><strong>Roll:</strong> ${esc(form.studentRoll || '')}</div>
      <div><strong>Instructor:</strong> ${esc(form.instructorName || '')}</div>
      <div><strong>Session:</strong> ${esc(form.session || '')}</div>
      <div><strong>Date:</strong> ${esc(form.date || '')}</div>
    </div>
  `

  const section = (title, body) => !body ? '' : `
    <div class="sec">
      <h3>${esc(title)}</h3>
      <div class="content">${esc(body)}</div>
    </div>
  `

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        ${style}
      </head>
      <body>
        <div class="page">
          ${header}
          ${meta}
          <div class="sec">
            <h3>Experiment ${esc(form.experimentNo || '')}: ${esc(form.experimentTitle || '')}</h3>
          </div>
          ${section('Objective', form.objective)}
          ${section('Apparatus', form.apparatus)}
          ${section('Theory', form.theory)}
          ${section('Procedure', form.procedure)}
          <div class="sec">
            <h3>Observed Data</h3>
            <table>
              <thead><tr><th>Parameter</th><th>Value</th><th>Unit</th></tr></thead>
              <tbody>${dataRows}</tbody>
            </table>
          </div>
          ${section('Calculations', form.calculations)}
          ${section('Result', form.result)}
          ${section('Discussion', form.discussion)}
          ${section('Conclusion', form.conclusion)}
          <div class="sign">
            <div>Student Signature: ___________</div>
            <div style="text-align:right;">Instructor Signature: ___________</div>
          </div>
        </div>
      </body>
    </html>
  `

  return html
}
