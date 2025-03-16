import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero section */}
            <div className="relative bg-gray-900">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                        alt="Digital Legacy background"
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-70" />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Twoje Cyfrowe Dziedzictwo
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                        Zachowaj swoje wspomnienia, wiadomości i ważne treści dla przyszłych pokoleń. Pozostaw to, co najważniejsze dla Twoich bliskich.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                        <Link
                            to="/register"
                            className="inline-block bg-blue-600 py-3 px-8 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700 transform transition duration-200 hover:scale-105"
                        >
                            Rozpocznij teraz
                        </Link>
                        <Link
                            to="/about"
                            className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-gray-50 transform transition duration-200 hover:scale-105"
                        >
                            Dowiedz się więcej
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
                            Funkcjonalności
                        </h2>
                        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                            Jak działa Digital Legacy
                        </p>
                        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                            Proste w obsłudze narzędzia, które pozwolą Ci zachować to, co najważniejsze.
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                            <div className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-90 sm:h-64">
                                    <div className="h-full w-full bg-blue-100 p-8 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-gray-900">
                                    <span className="absolute inset-0"></span>
                                    Nagrywaj wiadomości
                                </h3>
                                <p className="text-base text-gray-500">
                                    Twórz osobiste nagrania audio, wideo lub notatki tekstowe, które zostaną dostarczone do Twoich bliskich w odpowiednim momencie.
                                </p>
                            </div>

                            <div className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-90 sm:h-64">
                                    <div className="h-full w-full bg-blue-100 p-8 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-gray-900">
                                    <span className="absolute inset-0"></span>
                                    Bezpieczne przechowywanie
                                </h3>
                                <p className="text-base text-gray-500">
                                    Twoje treści są zaszyfrowane i bezpiecznie przechowywane do momentu, gdy mają zostać udostępnione wybranym odbiorcom.
                                </p>
                            </div>

                            <div className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-90 sm:h-64">
                                    <div className="h-full w-full bg-blue-100 p-8 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-gray-900">
                                    <span className="absolute inset-0"></span>
                                    Automatyczne dostarczanie
                                </h3>
                                <p className="text-base text-gray-500">
                                    Ustaw warunki dostarczenia wiadomości lub pozwól systemowi monitorować Twoją aktywność, aby wiadomości zostały wysłane w odpowiednim momencie.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-gray-50 py-16 lg:py-24">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <div className="text-center">
                            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                                Opinie naszych użytkowników
                            </h2>
                            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                                Poznaj doświadczenia osób, które już korzystają z Digital Legacy.
                            </p>
                        </div>

                        <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
                            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-base text-gray-500">
                                            "Digital Legacy pozwoliło mi przygotować wiadomości dla moich dzieci, które otrzymają w kluczowych momentach swojego życia. To niesamowite uczucie wiedzieć, że będę mógł być częścią ich przyszłości."
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                                MK
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                Marek K.
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Używa Digital Legacy od 2023
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-base text-gray-500">
                                            "W obliczu poważnej choroby, możliwość nagrania wiadomości dla moich bliskich dała mi ogromny spokój ducha. Wiem, że będą mieli coś, co pomoże im pamiętać."
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                                AN
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                Anna N.
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Używa Digital Legacy od 2022
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-base text-gray-500">
                                            "Jako osoba, która często podróżuje w niebezpieczne rejony, Digital Legacy daje mi pewność, że moje wspomnienia i wiadomości dotrą do bliskich, jeśli cokolwiek mi się stanie."
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                                TW
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                Tomasz W.
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Używa Digital Legacy od 2023
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Gotowy, by zachować swoje dziedzictwo?</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-blue-100">
                        Dołącz do tysięcy osób, które już teraz tworzą swoje cyfrowe dziedzictwo dla przyszłych pokoleń.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transform transition duration-200 hover:scale-105"
                            >
                                Rozpocznij za darmo
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex">
                            <Link
                                to="/pricing"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 transform transition duration-200 hover:scale-105"
                            >
                                Zobacz plany
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;