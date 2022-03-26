import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { GetLocationDocument, Localization } from '../../graphql/schema';
import { client } from '../../lib/apollo';

interface Props {
  location: Localization;
}

export default function Page({ location }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Location: {location.name}</h1>
      <h2>Characters</h2>
      {location.characters.map(({ id, codename, image }) => (
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
    data: { localization },
  } = await client.query({
    query: GetLocationDocument,
    variables: {
      name,
    },
  });

  if (!localization) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      location: localization,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
