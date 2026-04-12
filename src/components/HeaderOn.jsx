import { Button } from "./ui/Button"

export function HeaderOn({ authenticated, user, onLogout }) {
    return (
        <header>
            <div className="flex items-center gap-3 self-start md:self-auto">
                {authenticated && user ? (<div></div>) : (<div></div>)}
            </div>
            <Button variant="ghost" onClick={onLogout}>
                Log out
            </Button>
        </header>
    )
}