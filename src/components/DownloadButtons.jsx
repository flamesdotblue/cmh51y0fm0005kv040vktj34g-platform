import { Download, Eye } from 'lucide-react'

export default function DownloadButtons({ form, docHTML, previewRef }) {
  const fileName = makeFileName(form)

  const downloadDoc = () => {
    const blob = new Blob([`\ufeff${docHTML}`], { type: 'application/msword;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName}.doc`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const openPrint = () => {
    // Open a print window with the same HTML but print-optimized
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.document.open()
    printWindow.document.write(docHTMLForPrint(docHTML))
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 400)
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={downloadDoc} className="inline-flex items-center gap-2 rounded-md bg-emerald-600 text-white px-3 py-1.5 text-sm hover:bg-emerald-700">
        <Download size={16} /> Download .doc
      </button>
      <button onClick={openPrint} className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">
        <Eye size={16} /> Print / PDF
      </button>
    </div>
  )
}

function makeFileName(form) {
  const parts = [
    'RUET_LabReport',
    form.courseCode || '',
    `Exp${form.experimentNo || ''}`,
    (form.studentRoll || form.studentName || '').replace(/\s+/g, '_'),
  ]
    .filter(Boolean)
    .join('_')
  return parts || 'RUET_LabReport'
}

function docHTMLForPrint(inner) {
  // Wrap the same HTML into a full document for print context
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Print</title></head><body>${inner}</body></html>`
}
