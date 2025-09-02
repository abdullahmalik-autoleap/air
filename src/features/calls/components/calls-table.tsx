"use client"
import { useEffect, useState } from "react"
import { fetchCalls } from "../lib/mock"
import CallTable from "@/components/shared/call-table"

export default function CallsTable() {
  const [rows, setRows] = useState<any[]>([])
  useEffect(() => {
    fetchCalls().then((data) => setRows(data))
  }, [])
  return <CallTable rows={rows} />
}


