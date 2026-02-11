import { Avatar, Button, Card } from "@fefade-ui/react"
import Link from "next/link"
import {
	BrushIcon,
	HomeIcon,
	ImageIcon,
	LayoutDashboardIcon,
	PaletteIcon,
	SearchIcon,
	VideoIcon,
	Dice4Icon,
	TypeOutlineIcon,
	BookIcon,
	RssIcon,
	WrenchIcon,
	ComponentIcon,
	LightbulbIcon,
	BoxIcon
} from "lucide-react"
import Image from "next/image"
import logoImage from "$lib/app/favicon.ico"

export default function Navbar() {
	return (
		<div>
			<div style={{ display: "flex", alignItems: "center" }}>
				<Link href="/">
					<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
						<Image alt="logo" src={logoImage} height={24} width={24} />
						<h3>Sets</h3>
					</div>
				</Link>
				<div style={{ flex: "1" }}></div>
				<div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
					<Button variant="text">
						<SearchIcon width="24px" height="24px" />
					</Button>
					<Button pressedEffect={false} variant="text">
						<Card
							className="rounded-full"
							style={{ width: "40px", height: "40px", padding: 0 }}
							animatedBorder={{
								width: "4px",
								primaryColor: "#FF007F",
								secondaryColor: "#8000FF"
							}}
						>
							<Avatar
								size="xs"
								src="https://avatars.githubusercontent.com/u/26321303?v=4"
								textFallback="test"
							/>
						</Card>
					</Button>
				</div>
			</div>
			<div
				style={{
					display: "grid",
					gap: "0.5rem",
					gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
					padding: "1rem 0"
				}}
			>
				{[
					{ label: "Home", href: "/", icon: <HomeIcon size={15} /> },
					{
						label: "Icons",
						href: "/icons",
						icon: <LayoutDashboardIcon size={15} />
					},
					{
						label: "Illustrations",
						href: "/illustrations",
						icon: <BrushIcon size={15} />
					},
					{ label: "Photos", href: "/photos", icon: <ImageIcon size={15} /> },
					{ label: "Videos", href: "/videos", icon: <VideoIcon size={15} /> },
					{
						label: "Colors",
						href: "/colors",
						icon: <PaletteIcon size={15} />
					},
					{
						label: "Backgrounds",
						href: "/backgrounds",
						icon: <Dice4Icon size={15} />
					},
					{
						label: "Typography",
						href: "/typography",
						icon: <TypeOutlineIcon size={15} />
					},
					{ label: "3D", href: "/3d", icon: <BoxIcon size={15} /> },
					{
						label: "Libraries",
						href: "/libraries",
						icon: <BookIcon size={15} />
					},
					{ label: "Blogs", href: "/blogs", icon: <RssIcon size={15} /> },
					{ label: "Tools", href: "/tools", icon: <WrenchIcon size={15} /> },
					{
						label: "Inspirations",
						href: "/inspirations",
						icon: <LightbulbIcon size={15} />
					},
					{
						label: "Components",
						href: "/components",
						icon: <ComponentIcon size={15} />
					}
				]
					.slice()
					.sort((a, b) => {
						if (a.href === "/") return -1
						if (b.href === "/") return 1
						return a.label.localeCompare(b.label)
					})
					.map(({ label, href, icon }) => (
						<Link key={label} href={href}>
							<Button variant="outlined" style={{ width: "100%" }}>
								{icon}
								{label}
							</Button>
						</Link>
					))}
			</div>
		</div>
	)
}
