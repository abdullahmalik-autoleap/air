"use client"
import { useEffect, useState } from "react"
import { fetchCalls } from "../lib/mock"
import CallTable from "@/components/shared/call-table"
import type { CallLog } from "../types"

export default function CallsTable() {
  const [rows, setRows] = useState<CallLog[]>([])
  useEffect(() => {
    fetchCalls().then((data) => setRows(data))
  }, [])
  return <CallTable rows={rows} />
}


