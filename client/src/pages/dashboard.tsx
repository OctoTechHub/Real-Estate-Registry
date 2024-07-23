import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';
import Navbar from '../components/Navbar';

const API_KEY = '1d9b0c2d45d634923a3ecea952c8aa04';
// replace this with your Subgraph URL
const subgraphQueryUrl = `https://gateway-arbitrum.network.thegraph.com/api/subgraphs/id/DZz4kDTdmzWLWsV373w2bSmoar3umKKH9y82SUKr5qmp`;
const client = new GraphQLClient(subgraphQueryUrl, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const SUBGRAPHS_QUERY = gql`
  query Subgraphs($first: Int, $skip: Int, $where: Subgraph_filter) {
    subgraphs(first: $first, skip: $skip, where: $where) {
      id
      metadata {
        displayName
        image
        description
      }
      owner {
        id
      }
    }
  }
`;

interface SubgraphData {
  id: string;
  metadata?: {
    displayName?: string | null;
    description?: string | null;
  } | null;
  owner: {
    id: string;
  };
}

interface SubgraphsResponse {
  subgraphs: SubgraphData[];
}

export default function Dashboard() {
  const { data, status } = useQuery({
    queryKey: ['subgraphs'],
    async queryFn() {
      const response = await client.request<SubgraphsResponse>(SUBGRAPHS_QUERY, {
        first: 10,
        skip: 0,
        where: {
          metadata_not: null,
          metadata_: { description_not: null },
          owner_not: '0x0000000000000000000000000000000000000000',
        },
      });
      return response;
    },
  });

  // This is a placeholder for fetching properties from the backend.
  const { data: propertiesData, status: propertiesStatus } = useQuery({
    queryKey: ['properties'],
    async queryFn() {
      // Replace with your backend call
      return await fetch('/api/properties').then((res) => res.json());
    },
  });

  return (
    <>
      <Navbar />
      <main className="h-full min-h-screen mx-auto max-w-7xl mt-10 flex flex-col gap-y-24">
        <section className="properties-section">
          <h1 className="text-3xl">Property Listings</h1>
          {propertiesStatus === 'pending' ? (
            <div>Loading properties...</div>
          ) : propertiesStatus === 'error' ? (
            <div>Error occurred while fetching properties</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertiesData?.map((property: any) => (
                <div key={property.id} className="property-card bg-white shadow-md rounded-md p-4">
                  <h2 className="text-xl font-bold">{property.name}</h2>
                  <p className="text-gray-700">{property.description}</p>
                  <p className="text-gray-500">{property.location}</p>
                  {/* Add more property details as needed */}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="subgraphs-section">
          <h1 className="text-3xl">The Graph Queries</h1>
          {status === 'pending' ? <div>Loading Subgraph data...</div> : null}
          {status === 'error' ? <div>Error occurred querying the Subgraph</div> : null}
          <div>
            <div className="flow-root">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-50">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-50"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-50"
                        >
                          Owner
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {(data?.subgraphs ?? []).map((s: SubgraphData) => (
                        <tr key={s.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-0">
                            {s.metadata?.displayName || s.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 dark:text-gray-100 min-w-fit max-w-md truncate">
                            {s.metadata?.description || ''}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 dark:text-gray-100">
                            {s.owner.id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export { Dashboard };
