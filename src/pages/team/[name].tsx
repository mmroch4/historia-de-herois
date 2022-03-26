import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { GetTeamDocument, Team } from '../../graphql/schema';
import { client } from '../../lib/apollo';

interface Props {
  team: Team;
}

export default function Page({ team }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Team: {team.name}</h1>
      <h2>Characters</h2>
      {team.characters.map(({ id, codename, image }) => (
        <div key={id}>
          <Image
            src={image.url}
            alt={`${codename}'s picture`}
            width="200"
            height="200"
            priority
          />
          <h3>{codename}</h3>
          <Link passHref href={`/character/${codename}`}>
            Check character
          </Link>
        </div>
      ))}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as ParsedUrlQuery;

  const {
    data: { team },
  } = await client.query({
    query: GetTeamDocument,
    variables: {
      name,
    },
  });

  if (!team) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      team,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
