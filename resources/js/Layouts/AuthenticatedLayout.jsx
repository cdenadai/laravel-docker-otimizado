import Menu from '@/Components/Menu/Menu';

export default function Authenticated({ user, header, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Menu user={user}/>

            {header && (
                <header className="bg-white shadow">
                    <div className=" py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
