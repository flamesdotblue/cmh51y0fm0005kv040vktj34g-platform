import { useState, useMemo, useRef } from 'react'
import Header from './components/Header'
import LabReportForm from './components/LabReportForm'
import Preview from './components/Preview'
import DownloadButtons from './components/DownloadButtons'
import { buildDocHTML } from './components/docGenerator'

export default function App() {
  const [form, setForm] = useState({
    university: 'Rajshahi University of Engineering & Technology (RUET)',
    department: '',
    courseTitle: '',
    courseCode: '',
    experimentNo: '',
    experimentTitle: '',
    instructorName: '',
    studentName: '',
    studentRoll: '',
    session: '',
    date: '',
    objective: '',
    apparatus: '',
    theory: '',
    procedure: '',
    dataRows: [{ parameter: '', value: '', unit: '' }],
    calculations: '',
    result: '',
    discussion: '',
    conclusion: '',
  })

  const previewRef = useRef(null)

  const docHTML = useMemo(() => buildDocHTML(form), [form])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 lg:p-6">
          <h2 className="text-lg font-semibold mb-4">Report Input</h2>
          <LabReportForm form={form} setForm={setForm} />
        </section>
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <h2 className="text-lg font-semibold">Preview</h2>
            <DownloadButtons form={form} docHTML={docHTML} previewRef={previewRef} />
          </div>
          <Preview ref={previewRef} form={form} />
        </section>
      </main>
      <div id="print-root" dangerouslySetInnerHTML={{ __html: '' }} />
    </div>
  )
}
