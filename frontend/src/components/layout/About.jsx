import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero section */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">O Digital Legacy</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Nasza misja to pomóc Ci zachować i przekazać ważne wspomnienia oraz wiadomości Twoim bliskim, nawet po Twoim odejściu.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link
                                            to="/register"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                                        >
                                            Zacznij teraz
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link
                                            to="/pricing"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                                        >
                                            Nasze plany
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="https://images.unsplash.com/photo-1516728778615-2d590ea1855e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        alt="Wspomnienia w formie cyfrowej"
                    />
                </div>
            </div>

            {/* Feature section */}
            <div className="py-16 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Nasza historia</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Czym jest Digital Legacy?
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Digital Legacy powstało z potrzeby zachowania wspomnień i ważnych wiadomości dla przyszłych pokoleń w erze cyfrowej.
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Nasza wizja</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Wierzymy, że każda osoba ma prawo do zachowania swojego dziedzictwa cyfrowego i przekazania go bliskim. Nasze rozwiązanie pozwala zapisać ważne wspomnienia, wiadomości i refleksje w bezpieczny sposób.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Bezpieczeństwo</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Twoje dane są dla nas priorytetem. Wszystkie Twoje wiadomości i materiały są szyfrowane i bezpiecznie przechowywane, dostępne tylko dla wybranych przez Ciebie osób, gdy nadejdzie właściwy czas.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Nasz zespół</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Za Digital Legacy stoi zespół specjalistów z dziedziny bezpieczeństwa cyfrowego, psychologii i technologii, którzy rozumieją wagę wspomnień i relacji międzyludzkich.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Wartości</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Wierzymy w uczciwość, przejrzystość i etyczne podejście do przechowywania danych. Nigdy nie wykorzystujemy Twoich treści w celach komercyjnych ani nie udostępniamy ich osobom trzecim.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Testimonial section */}
            <div className="bg-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Opinie</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Co mówią nasi użytkownicy
                        </p>
                    </div>
                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-xl font-bold text-blue-600">JK</span>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium">Jan Kowalski</h4>
                                        <p className="text-gray-500">Użytkownik od 2023</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">
                                    "Digital Legacy dało mi spokój ducha. Wiem, że moje wspomnienia i wiadomości dla najbliższych zostaną przekazane, gdy mnie już nie będzie."
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-xl font-bold text-blue-600">MN</span>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium">Maria Nowak</h4>
                                        <p className="text-gray-500">Użytkownik od 2022</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">
                                    "Korzystam z Digital Legacy, aby zostawić wiadomości dla moich dzieci i wnuków. To jak pisanie listów do przyszłości, które kiedyś będą cennymi wspomnieniami."
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-xl font-bold text-blue-600">AZ</span>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium">Adam Zieliński</h4>
                                        <p className="text-gray-500">Użytkownik od 2023</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">
                                    "Jako osoba chora, miałem potrzebę przekazania osobistych wiadomości moim bliskim. Digital Legacy umożliwiło mi to w godny i przemyślany sposób."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA section */}
            <div className="bg-blue-700">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Gotowy, by rozpocząć?</span>
                        <span className="block text-blue-200">Stwórz swoje cyfrowe dziedzictwo już dziś.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                            >
                                Rozpocznij za darmo
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link
                                to="/pricing"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
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

export default About;