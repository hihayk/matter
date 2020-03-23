import * as React from "react"

function SvgCross(props) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M1 17L17 1M17 17L1 1" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )
}

export default SvgCross
