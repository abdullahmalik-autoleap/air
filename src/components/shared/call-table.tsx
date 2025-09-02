type CallRow = {
  id: string
  caller: string
  time: string
  status: string
  duration: string
}

type CallTableProps = {
  rows: CallRow[]
}

export default function CallTable({ rows }: CallTableProps) {
  return (
    <div className="overflow-hidden rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <thead className="bg-muted/50">
          <tr className="border-b">
            <th className="px-3 py-2 text-left font-medium">Caller</th>
            <th className="px-3 py-2 text-left font-medium">Time</th>
            <th className="px-3 py-2 text-left font-medium">Status</th>
            <th className="px-3 py-2 text-left font-medium">Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b last:border-0">
              <td className="px-3 py-2">{row.caller}</td>
              <td className="px-3 py-2 text-muted-foreground">{row.time}</td>
              <td className="px-3 py-2 capitalize">{row.status}</td>
              <td className="px-3 py-2 text-muted-foreground">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


