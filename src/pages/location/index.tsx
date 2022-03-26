import { GetStaticProps } from 'next';
import Link from 'next/link';
import { GetLocationsDocument, Localization } from '../../graphql/schema';
import { client } from '../../lib/apollo';

interface Props {
  locations: Localization[];
}

export default function Page({ locations }: Props) {
  return (
    <>
      {locations.map(({ id, name }) => (
        <div key={id}>
          <h3>{name}</h3>
          <Link passHref href={`/location/${name}`}>
            Check location
          </Link>
        </div>
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { localizations },
  } = await client.query({
    query: GetLocationsDocument,
  });

  return {
    props: {
      locations: localizations,
    },
    revalidate: 60 * 10, // 10 mins
  };
};
