import React, { forwardRef } from 'react'

const Preview = forwardRef(function Preview({ form }, ref) {
  const DataTable = () => (
    <table className="w-full border border-slate-300 text-sm">
      <thead className="bg-slate-50">
        <tr>
          <th className="border-b border-slate-300 p-2 text-left">Parameter</th>
          <th className="border-b border-slate-300 p-2 text-left">Value</th>
          <th className="border-b border-slate-300 p-2 text-left">Unit</th>
        </tr>
      </thead>
      <tbody>
        {form.dataRows.map((r, i) => (
          <tr key={i} className="odd:bg-white even:bg-slate-50">
            <td className="border-t border-slate-200 p-2">{r.parameter}</td>
            <td className="border-t border-slate-200 p-2">{r.value}</td>
            <td className="border-t border-slate-200 p-2">{r.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div ref={ref} className="h-full overflow-auto">
      <div className="p-6">
        <div className="mx-auto bg-white border border-slate-200 shadow-sm rounded-lg p-8 max-w-3xl">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">{form.university || 'RUET'}</h2>
            <p className="text-sm text-slate-700">Department: {form.department || '—'}</p>
            <p className="text-sm text-slate-700">Course: {form.courseTitle || '—'} ({form.courseCode || '—'})</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <p><span className="font-semibold">Student:</span> {form.studentName || '—'}</p>
            <p><span className="font-semibold">Roll:</span> {form.studentRoll || '—'}</p>
            <p><span className="font-semibold">Instructor:</span> {form.instructorName || '—'}</p>
            <p><span className="font-semibold">Session:</span> {form.session || '—'}</p>
            <p><span className="font-semibold">Date:</span> {form.date || '—'}</p>
          </div>

          <div className="mt-6 space-y-4">
            <Section title={`Experiment ${form.experimentNo || ''}: ${form.experimentTitle || ''}`} body="" />
            <Section title="Objective" body={form.objective} />
            <Section title="Apparatus" body={form.apparatus} />
            <Section title="Theory" body={form.theory} />
            <Section title="Procedure" body={form.procedure} />
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Observed Data</h3>
              <DataTable />
            </div>
            <Section title="Calculations" body={form.calculations} />
            <Section title="Result" body={form.result} />
            <Section title="Discussion" body={form.discussion} />
            <Section title="Conclusion" body={form.conclusion} />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="text-sm text-slate-700">
              <p>Student Signature: ___________</p>
            </div>
            <div className="text-sm text-slate-700 text-right">
              <p>Instructor Signature: ___________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

function Section({ title, body }) {
  if (!title && !body) return null
  return (
    <div className="space-y-1">
      {title ? <h3 className="text-base font-semibold">{title}</h3> : null}
      {body ? <p className="whitespace-pre-wrap leading-relaxed">{body}</p> : null}
    </div>
  )
}

export default Preview
