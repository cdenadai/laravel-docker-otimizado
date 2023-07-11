import AdminTable from '@/Components/Admin/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, data }) {
    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title="Dashboard" />

            <div className="rounded-sm">
                <AdminTable admins={data}/>
            </div>
        </AuthenticatedLayout>
    );
}
