import { GetStaticProps } from 'next';
import Link from 'next/link';
import { GetTeamsDocument, Team } from '../../graphql/schema';
import { client } from '../../lib/apollo';

interface Props {
  teams: Team[];
}

export default function Page({ teams }: Props) {
  return (
    <>
      {teams.map(({ id, name }) => {
        return (
          <div key={id}>
            <h3>{name}</h3>
            <Link passHref href={`/team/${name}`}>
              Check team
            </Link>
          </div>
        );
      })}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { teams },
  } = await client.query({
    query: GetTeamsDocument,
  });

  return {
    props: {
      teams,
    },
    revalidate: 60 * 10, // 10 mins
  };
};
