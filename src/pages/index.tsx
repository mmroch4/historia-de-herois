import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Character, GetCharactersDocument } from '../graphql/schema';
import { client } from '../lib/apollo';

interface Props {
  characters: Character[];
}

export default function Page({ characters }: Props) {
  return (
    <>
      <h1>Characters</h1>
      {characters.map(({ id, codename, introduction }) => (
        <div key={id}>
          <h3>{codename}</h3>
          <p>{introduction}</p>
          <Link passHref href={`/character/${codename}`}>
            Check the story
          </Link>
        </div>
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { characters },
  } = await client.query({
    query: GetCharactersDocument,
  });

  return {
    props: {
      characters,
    },
    revalidate: 60 * 10, // 10 mins
  };
};
