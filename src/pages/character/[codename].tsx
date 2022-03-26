import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { Character, GetCharacterDocument } from '../../graphql/schema';
import { client } from '../../lib/apollo';

interface Props {
  character: Character;
}

export default function Page({ character }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Image
        src={character.image.url}
        alt={`${character.codename}'s picture`}
        width="200"
        height="200"
        priority
      />
      <h1>{character.codename}</h1>
      <p>
        team:{' '}
        <Link passHref href={`/team/${character.team?.name}`}>
          {character.team?.name}
        </Link>
      </p>
      <p>
        brand:{' '}
        <Link passHref href={`/brand/${character.brand?.name}`}>
          {character.brand?.name}
        </Link>
      </p>
      <p>
        location:{' '}
        <Link passHref href={`/location/${character.localization?.name}`}>
          {character.localization?.name}
        </Link>
      </p>
      <p>
        archetype:{' '}
        <Link passHref href={`/archetype/${character.archetype?.name}`}>
          {character.archetype?.name}
        </Link>
      </p>
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
  const { codename } = params as ParsedUrlQuery;

  const {
    data: { character },
  } = await client.query({
    query: GetCharacterDocument,
    variables: {
      codename,
    },
  });

  if (!character) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      character,
    },
    revalidate: 60 * 10, // 10 mins
  };
};
