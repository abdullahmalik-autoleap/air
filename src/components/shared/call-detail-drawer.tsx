"use client"
import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"

type CallDetailDrawerProps = {
  trigger: React.ReactNode
  title: string
  content: React.ReactNode
}

export default function CallDetailDrawer({ trigger, title, content }: CallDetailDrawerProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l bg-background p-6 shadow-2xl outline-none">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
            <Dialog.Close className="rounded p-2 text-muted-foreground hover:bg-muted" aria-label="Close">
              ✕
            </Dialog.Close>
          </div>
          <div className="mt-4 space-y-4">{content}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}


