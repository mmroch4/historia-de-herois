import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { Archetype, GetArchetypeDocument } from '../../graphql/schema';
import { client } from '../../lib/apollo';

interface Props {
  archetype: Archetype;
}

export default function Page({ archetype }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Archetype: {archetype.name}</h1>
      <h2>Characters</h2>
      {archetype.characters.map(({ id, codename, image }) => (
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
    data: { archetype },
  } = await client.query({
    query: GetArchetypeDocument,
    variables: {
      name,
    },
  });

  if (!archetype) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      archetype,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
