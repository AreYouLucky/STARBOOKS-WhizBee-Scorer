import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ children }) {
    return (
        <div className="quiz-page flex items-center justify-center px-4 py-8">
            <div className="quiz-panel relative z-10 w-full max-w-md overflow-hidden px-6 py-8 sm:px-10 sm:py-24">
                <div className="mb-8 text-center">
                    <div className="mx-auto inline-flex rounded-2xl px-5">
                        <ApplicationLogo className="w-56" />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
