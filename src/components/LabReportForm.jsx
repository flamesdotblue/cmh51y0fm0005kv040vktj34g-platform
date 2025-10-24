import { Plus, Trash2 } from 'lucide-react'

export default function LabReportForm({ form, setForm }) {
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const updateRow = (idx, key, value) => {
    const next = [...form.dataRows]
    next[idx] = { ...next[idx], [key]: value }
    setForm(prev => ({ ...prev, dataRows: next }))
  }

  const addRow = () => setForm(prev => ({ ...prev, dataRows: [...prev.dataRows, { parameter: '', value: '', unit: '' }] }))

  const removeRow = (idx) => {
    const next = form.dataRows.filter((_, i) => i !== idx)
    setForm(prev => ({ ...prev, dataRows: next.length ? next : [{ parameter: '', value: '', unit: '' }] }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="University" value={form.university} onChange={v => update('university', v)} />
        <Field label="Department" placeholder="e.g., EEE / CSE / ME" value={form.department} onChange={v => update('department', v)} />
        <Field label="Course Title" value={form.courseTitle} onChange={v => update('courseTitle', v)} />
        <Field label="Course Code" value={form.courseCode} onChange={v => update('courseCode', v)} />
        <Field label="Experiment No." value={form.experimentNo} onChange={v => update('experimentNo', v)} />
        <Field label="Experiment Title" value={form.experimentTitle} onChange={v => update('experimentTitle', v)} />
        <Field label="Instructor Name" value={form.instructorName} onChange={v => update('instructorName', v)} />
        <Field label="Student Name" value={form.studentName} onChange={v => update('studentName', v)} />
        <Field label="Roll No." value={form.studentRoll} onChange={v => update('studentRoll', v)} />
        <Field label="Session" value={form.session} onChange={v => update('session', v)} />
        <Field type="date" label="Date" value={form.date} onChange={v => update('date', v)} />
      </div>

      <TextArea label="Objective" value={form.objective} onChange={v => update('objective', v)} />
      <TextArea label="Apparatus" value={form.apparatus} onChange={v => update('apparatus', v)} />
      <TextArea label="Theory" value={form.theory} onChange={v => update('theory', v)} />
      <TextArea label="Procedure" value={form.procedure} onChange={v => update('procedure', v)} />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Observed Data</label>
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left">
                <th className="px-3 py-2 font-semibold text-slate-700">Parameter</th>
                <th className="px-3 py-2 font-semibold text-slate-700">Value</th>
                <th className="px-3 py-2 font-semibold text-slate-700">Unit</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {form.dataRows.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-3 py-2">
                    <input value={row.parameter} onChange={e => updateRow(idx, 'parameter', e.target.value)} className="w-full rounded-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
                  </td>
                  <td className="px-3 py-2">
                    <input value={row.value} onChange={e => updateRow(idx, 'value', e.target.value)} className="w-full rounded-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
                  </td>
                  <td className="px-3 py-2">
                    <input value={row.unit} onChange={e => updateRow(idx, 'unit', e.target.value)} className="w-full rounded-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button type="button" onClick={() => removeRow(idx)} className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 px-2 py-1">
                      <Trash2 size={16} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={addRow} className="mt-2 inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">
          <Plus size={16} /> Add Row
        </button>
      </div>

      <TextArea label="Calculations" value={form.calculations} onChange={v => update('calculations', v)} />
      <TextArea label="Result" value={form.result} onChange={v => update('result', v)} />
      <TextArea label="Discussion" value={form.discussion} onChange={v => update('discussion', v)} />
      <TextArea label="Conclusion" value={form.conclusion} onChange={v => update('conclusion', v)} />
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} className="w-full rounded-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
    </div>
  )
}

function TextArea({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <textarea rows={4} value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-md border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
    </div>
  )
}
