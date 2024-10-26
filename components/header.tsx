"use client";

import Link from "next/link";
import { Gem } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
	return (
		<header className='border-b border-border/5 bg-background'>
			<div className='mx-auto w-full max-w-5xl px-4 sm:px-6 flex h-16 items-center justify-between'>
				<Link
					href='/'
					aria-label='Gem icon'
					className='text-foreground hover:text-primary/80 transition-colors'
				>
					<Gem
						className='h-7 w-7 text-purple-600'
						strokeWidth={1.5}
					/>
				</Link>
				<div className='flex items-center'>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};
