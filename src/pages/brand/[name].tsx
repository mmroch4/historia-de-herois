import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import {
  Brand,
  GetBrandDocument,
  GetTeamDocument,
  Team,
} from '../../graphql/schema';
import { client } from '../../lib/apollo';

interface Props {
  brand: Brand;
}

export default function Page({ brand }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Brand: {brand.name}</h1>
      <h2>Characters</h2>
      {brand.characters.map(({ id, codename, image }) => (
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
    data: { brand },
  } = await client.query({
    query: GetBrandDocument,
    variables: {
      name,
    },
  });

  if (!brand) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      brand,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
