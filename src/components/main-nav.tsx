import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export function MainNav() {
    return (
        <div className="shadow-sm sticky top-0">
            <div className="container mx-auto">
                <nav className="flex items-center py-4 bg-background justify-between">
                    <Link
                    to="/"
                    className="text-2xl font-medium transition-colors hover:text-primary"
                    >
                    LOGO
                    </Link>
                    <ModeToggle />
                </nav>
            </div>
        </div>
    );
}