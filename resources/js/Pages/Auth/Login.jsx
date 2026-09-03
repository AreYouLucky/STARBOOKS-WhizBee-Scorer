import { useEffect,useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head } from '@inertiajs/react';

export default function Login() {
    const [ data, setData ] = useState({
        username: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        axios.post('/login',data).then(
            res => {
                window.location = '/dashboard'
            }
        ).catch(
            err=>{
                alert("❌ Error: Invalid Credentials");
            }
        )
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        type="username"
                        name="username"
                        value={data.username}
                        className="mt-2 block w-full"
                        placeholder="Enter your username"
                        autoComplete="username"
                        onChange={(e) => setData({...data , 'username': e.target.value})}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        onChange={(e) => setData({...data ,'password': e.target.value})}
                    />
                </div>

                

                <div className="pt-2">
                    <PrimaryButton className="w-full justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-sm text-white shadow-lg shadow-blue-500/20 hover:from-cyan-600 hover:to-blue-700" >
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
