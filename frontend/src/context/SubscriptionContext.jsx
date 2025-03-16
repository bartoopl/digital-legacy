import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const SubscriptionContext = createContext();

const SubscriptionContextProvider = ({ children }) => {
    const [subscription, setSubscription] = useState({
        status: 'active',
        endDate: null,
        active: true
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isAuthenticated, user } = useContext(AuthContext);

    // Pobierz dane o subskrypcji, gdy użytkownik jest zalogowany
    useEffect(() => {
        const fetchSubscriptionData = async () => {
            if (isAuthenticated && user) {
                try {
                    setLoading(true);

                    // Możemy pobrać dane subskrypcji bezpośrednio z użytkownika,
                    // jeśli są już zawarte w obiekcie użytkownika
                    if (user.subscriptionStatus) {
                        setSubscription({
                            status: user.subscriptionStatus,
                            endDate: user.subscriptionEndDate,
                            active: user.subscriptionStatus === 'active'
                        });
                        setLoading(false);
                        return;
                    }

                    // Alternatywnie, można utworzyć endpoint API do pobierania danych subskrypcji
                    // const res = await axios.get('/api/subscription');
                    // setSubscription(res.data);

                    setError(null);
                    setLoading(false);
                } catch (err) {
                    setError(err.response?.data?.message || 'Błąd podczas ładowania danych subskrypcji');
                    setLoading(false);
                }
            } else {
                // Zresetuj dane subskrypcji, gdy użytkownik nie jest zalogowany
                setSubscription({
                    status: 'active',
                    endDate: null,
                    active: true
                });
                setLoading(false);
            }
        };

        fetchSubscriptionData();
    }, [isAuthenticated, user]);

    // Funkcja do aktualizacji subskrypcji
    const updateSubscription = async (subscriptionData) => {
        try {
            setLoading(true);

            // W rzeczywistej implementacji, tutaj byłoby wywołanie API do aktualizacji subskrypcji
            // const res = await axios.put('/api/subscription', subscriptionData);
            // setSubscription(res.data);

            // Dla teraz, po prostu aktualizujemy lokalny stan
            setSubscription({
                ...subscription,
                ...subscriptionData
            });

            setError(null);
            setLoading(false);

            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Nie udało się zaktualizować subskrypcji');
            setLoading(false);
            return false;
        }
    };

    return (
        <SubscriptionContext.Provider
            value={{
                subscription,
                loading,
                error,
                updateSubscription
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};

export default SubscriptionContextProvider;