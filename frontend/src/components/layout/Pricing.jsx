import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const [annual, setAnnual] = useState(true);

    const toggleBilling = () => {
        setAnnual(!annual);
    };

    const plans = [
        {
            name: 'Basic',
            description: 'Wszystko, czego potrzebujesz, aby zacząć',
            monthlyPrice: 19.99,
            annualPrice: 199.99,
            features: [
                'Przechowywanie do 1GB plików',
                'Maksymalnie 5 odbiorców',
                'Przechowywanie notatek tekstowych',
                'Podstawowe bezpieczeństwo danych',
                'Dostęp z jednego urządzenia'
            ],
            cta: 'Wybierz Basic',
            highlight: false
        },
        {
            name: 'Premium',
            description: 'Doskonały dla osób z większymi potrzebami',
            monthlyPrice: 39.99,
            annualPrice: 399.99,
            features: [
                'Przechowywanie do 10GB plików',
                'Maksymalnie 15 odbiorców',
                'Przechowywanie audio i wideo',
                'Zaawansowane szyfrowanie danych',
                'Dostęp z wielu urządzeń',
                'Harmonogramy wysyłki',
                'Priorytetowe wsparcie'
            ],
            cta: 'Wybierz Premium',
            highlight: true
        },
        {
            name: 'Family',
            description: 'Dla całej rodziny i bliskich',
            monthlyPrice: 69.99,
            annualPrice: 699.99,
            features: [
                'Przechowywanie do 50GB plików',
                'Nieograniczona liczba odbiorców',
                'Wszystkie funkcje Premium',
                'Konta dla 5 członków rodziny',
                'Zaawansowane zarządzanie dostępem',
                'Wsparcie 24/7',
                'Eksport danych w dowolnym momencie'
            ],
            cta: 'Wybierz Family',
            highlight: false
        }
    ];

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Plany i cennik</h1>
                    <p className="mt-5 text-xl text-gray-500 sm:text-center">
                        Wybierz plan, który najlepiej odpowiada Twoim potrzebom
                    </p>
                    <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
                        <button
                            type="button"
                            className={`${
                                annual
                                    ? 'bg-white border-gray-200 shadow-sm text-gray-900'
                                    : 'border border-transparent text-gray-700'
                            } relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:w-auto sm:px-8`}
                            onClick={() => setAnnual(true)}
                        >
                            Rozliczenie roczne
                        </button>
                        <button
                            type="button"
                            className={`${
                                !annual
                                    ? 'bg-white border-gray-200 shadow-sm text-gray-900'
                                    : 'border border-transparent text-gray-700'
                            } ml-0.5 relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:w-auto sm:px-8`}
                            onClick={() => setAnnual(false)}
                        >
                            Rozliczenie miesięczne
                        </button>
                    </div>
                </div>
                <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`${
                                plan.highlight
                                    ? 'border-2 border-blue-500 shadow-xl'
                                    : 'border border-gray-200'
                            } rounded-lg shadow-sm divide-y divide-gray-200`}
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-medium text-gray-900">{plan.name}</h2>
                                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {annual
                        ? `${plan.annualPrice.toFixed(2)} zł`
                        : `${plan.monthlyPrice.toFixed(2)} zł`}
                  </span>
                                    <span className="text-base font-medium text-gray-500">
                    {annual ? '/rok' : '/mies.'}
                  </span>
                                </p>
                                {annual && (
                                    <p className="mt-2 text-sm text-green-600">
                                        Oszczędzasz {((plan.monthlyPrice * 12) - plan.annualPrice).toFixed(2)} zł rocznie
                                    </p>
                                )}
                                <Link
                                    to="/register"
                                    className={`${
                                        plan.highlight
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                    } mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                            <div className="pt-6 pb-8 px-6">
                                <h3 className="text-sm font-medium text-gray-900">Co obejmuje</h3>
                                <ul className="mt-6 space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex">
                                            <svg
                                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="ml-3 text-sm text-gray-500">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                        Najczęściej zadawane pytania
                    </h2>
                    <div className="mt-12">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
                            <div>
                                <dt className="text-lg leading-6 font-medium text-gray-900">
                                    Jak działa system Digital Legacy?
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    Możesz zapisywać wiadomości tekstowe, nagrania audio i wideo, które zostaną przesłane do wybranych przez Ciebie odbiorców w określonym czasie lub po Twoim odejściu.
                                </dd>
                            </div>

                            <div>
                                <dt className="text-lg leading-6 font-medium text-gray-900">
                                    Czy moje dane są bezpieczne?
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    Tak, wszystkie dane są szyfrowane end-to-end i przechowywane na serwerach z najwyższymi standardami bezpieczeństwa. Nikt poza wybranymi odbiorcami nie ma do nich dostępu.
                                </dd>
                            </div>

                            <div>
                                <dt className="text-lg leading-6 font-medium text-gray-900">
                                    Kiedy wiadomości są wysyłane?
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    Możesz ustawić automatyczne wysyłanie po upływie określonego czasu nieaktywności lub wybrać konkretne daty. Zawsze wysyłamy wcześniej powiadomienia, aby uniknąć przypadkowego uruchomienia.
                                </dd>
                            </div>

                            <div>
                                <dt className="text-lg leading-6 font-medium text-gray-900">
                                    Czy mogę zmienić plan w przyszłości?
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    Tak, możesz w dowolnym momencie zmienić swój plan na wyższy lub niższy. Różnica w cenie zostanie proporcjonalnie rozliczona.
                                </dd>
                            </div>

                            <div>
                                <dt className="text-lg leading-6 font-medium text-gray-900">
                                    Co się stanie, gdy przestanę płacić?
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    Po zakończeniu subskrypcji masz 30-dniowy okres karencji na odnowienie. Po tym czasie, Twoje wiadomości zostaną wysłane do odbiorców zgodnie z Twoimi ustawieniami.
                                </dd>
                            </div>

                            <div>
                                <dt className="text-lg leading-6 font-medium text-gray-900">
                                    Czy mogę wypróbować Digital Legacy za darmo?
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    Tak, oferujemy 14-dniowy okres próbny dla wszystkich nowych użytkowników, z dostępem do wszystkich funkcji planu Premium.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Gotowy, by zabezpieczyć swoje wspomnienia?</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-blue-200">
                        Zacznij już dziś tworzyć swoje cyfrowe dziedzictwo dla przyszłych pokoleń.
                    </p>
                    <Link
                        to="/register"
                        className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
                    >
                        Dołącz do nas
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Pricing;