export default function BgGradient1() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-green-50" />
      
      {/* Gradient circles */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
      
      {/* Additional decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-green-100/20 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-100/20 rounded-full blur-2xl" />
    </div>
  )
}
