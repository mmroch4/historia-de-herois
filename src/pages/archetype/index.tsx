import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Archetype, GetArchetypesDocument } from '../../graphql/schema';
import { client } from '../../lib/apollo';

interface Props {
  archetypes: Archetype[];
}

export default function Page({ archetypes }: Props) {
  return (
    <>
      {archetypes.map(({ id, name }) => (
        <div key={id}>
          <h3>{name}</h3>
          <Link passHref href={`/archetype/${name}`}>
            Check archetype
          </Link>
        </div>
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { archetypes },
  } = await client.query({
    query: GetArchetypesDocument,
  });

  return {
    props: {
      archetypes,
    },
    revalidate: 60 * 10, // 10 mins
  };
};
