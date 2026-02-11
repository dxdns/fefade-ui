"use client"
import { Link, Provider } from "@fefade-ui/react"
import { PropsWithChildren } from "react"
import styles from "./MainLayout.module.css"

type Props = PropsWithChildren & {}

export default function MainLayout({ children }: Props) {
	return (
		<Provider>
			<div className={styles.layout}>
				<main className={styles.content}>{children}</main>

				<footer className={styles.footer}>
					<div
						style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}
					>
						<span className="muted">&copy; 2025</span>
						<Link href="https://fefade.com" target="_blank" hover="right">
							fefade
						</Link>
					</div>
				</footer>
			</div>
		</Provider>
	)
}
