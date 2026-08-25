const PageHeader = ({ eyebrow = 'Workspace', title, description, action }) => (
  <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-800">{title}</h1>
      {description && <p className="mt-2 text-sm text-slate-400">{description}</p>}
    </div>
    {action}
  </div>
)

export default PageHeader
