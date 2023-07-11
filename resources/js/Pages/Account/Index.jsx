import AccountTable from '@/Components/Account/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const accounts = [
    {
        created_at: "20/09/2023",
        name: "Caio Rogério Denadai Souza",
        document: "361.539.218-33",
        status: "Aprovada",
        birth_date: "20/09/1987"
    }
];

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title="Dashboard" />

            <div className="rounded-sm">
                <AccountTable accounts={accounts}/>
            </div>
        </AuthenticatedLayout>
    );
}
