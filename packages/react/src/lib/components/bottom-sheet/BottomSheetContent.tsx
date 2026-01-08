import { classMapUtil } from "@fefade-ui/core/utils"
import { forwardRef, HTMLAttributes } from "react"
import styles from "@fefade-ui/core/styles/BottomSheetContent.module.css"

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {}

export default forwardRef<HTMLDivElement, Props>(
	({ className = "", children, ...rest }, ref) => {
		return (
			<div
				{...rest}
				ref={ref}
				className={classMapUtil(
					className,
					[className, styles],
					styles.bottomSheetContent
				)}
			>
				{children}
			</div>
		)
	}
)
