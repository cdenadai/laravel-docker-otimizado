import ResponsiveNavLink from "../ResponsiveNavLink";

export default function MenuItem({routeName, label, border}) {

    const borderClass = border ? 'border-t border-gray-200' : '';
    return (
        <div className={`pb-1 ${borderClass}`}>
            <ResponsiveNavLink href={route('dashboard')} active={route().current('accounts')}>
                {label}
            </ResponsiveNavLink>
        </div>
    );
}
