// components/ui/Skeleton.tsx

const Skeleton = ({ width = '100%', height = '100%', borderRadius = '0' }: { width?: string; height?: string; borderRadius?: string }) => {
    return (
      <div
        className="bg-gray-700 animate-pulse"
        style={{ width, height, borderRadius }}
      ></div>
    )
  }
  
  export default Skeleton
  