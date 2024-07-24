import Navbar from "../components/Navbar";
import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';

const API_KEY = '1d9b0c2d45d634923a3ecea952c8aa04';
const subgraphQueryUrl = `https://gateway-arbitrum.network.thegraph.com/api/subgraphs/id/DZz4kDTdmzWLWsV373w2bSmoar3umKKH9y82SUKr5qmp`;

// Create an instance of GraphQLClient
const client = new GraphQLClient(subgraphQueryUrl, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Define the GraphQL query
const SUBGRAPHS_QUERY = gql`
  query Subgraphs($first: Int, $skip: Int, $where: Subgraph_filter) {
    subgraphs(first: $first, skip: $skip, where: $where) {
      id
      metadata {
        displayName
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

export function GraphQueries() {
  // Use react-query to fetch data
  const { data: subgraphsData, status: subgraphsStatus } = useQuery({
    queryKey: ['subgraphs'],
    queryFn: async () => {
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

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col mt-7">
        <div className="bg-gray-800 text-white py-6 px-4 mt-10">
          <h1 className="text-3xl font-bold mb-4 text-center">The Graph Queries</h1>

          { subgraphsStatus === 'pending' ? <div>Loading Subgraph data...</div> : null}
          {subgraphsStatus === 'error' ? <div>Error occurred querying the Subgraph</div> : null}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 mt-5">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Owner
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(subgraphsData?.subgraphs ?? []).map((s: SubgraphData) => (
                  <tr key={s.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white">
                      {s.metadata?.displayName || s.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-white min-w-fit max-w-md truncate">
                      {s.metadata?.description || ''}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                      {s.owner.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
