export default function MenuItem({route, label, border}) {
    return (
        <div className="pb-1">
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                Contas
            </ResponsiveNavLink>
        </div>
    );
}
