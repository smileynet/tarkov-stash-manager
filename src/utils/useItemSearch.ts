'use client';
import {useEffect, useState} from 'react';
import {gql, GraphQLClient} from 'graphql-request';

const endpoint = 'https://api.tarkov.dev/graphql';
const client = new GraphQLClient(endpoint);

export const useItemSearch = (itemName: string) => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastSearched, setLastSearched] = useState('');

    useEffect(() => {
        if (itemName && itemName !== lastSearched) {
            setLoading(true);
            const query = gql`
                query GetItemByName($name: String!) {
                    itemsByName(name: $name) {
                        id
                        name
                        types
                        avg24hPrice
                        basePrice
                        width
                        height
                        changeLast48hPercent
                        iconLink
                        link
                        sellFor {
                            price
                            source
                        }
                    }
                }
            `;
            client.request(query, {name: itemName})
                .then(data => {
                    setItems(data.itemsByName);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                    setLoading(false);
                });
            setLastSearched(itemName);
        }
    }, [itemName]);

    return {items, loading, error};
};
