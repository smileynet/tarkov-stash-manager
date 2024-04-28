import {gql, GraphQLClient} from 'graphql-request';

const endpoint = 'https://api.tarkov.dev/graphql';

// Extend the TypeScript interface to include new fields
interface Item {
    id: string;
    name: string;
    types: string[];
    avg24hPrice: number;
    basePrice: number;
    width: number;
    height: number;
    changeLast48hPercent: number;
    iconLink: string;
    link: string;
    sellFor: {
        price: number;
        source: string;
    }[];
}

export const fetchItemsByName = async (itemName: string): Promise<Item[]> => {
    const client = new GraphQLClient(endpoint);
    const query = gql`
        query GetItemsByName($name: String!) {
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

    try {
        const variables = {name: itemName};
        const data = await client.request<{ itemsByName: Item[] }>(query, variables);
        return data.itemsByName;
    } catch (error) {
        console.error('Error fetching items by name from Tarkov API:', error);
        return [];
    }
};
