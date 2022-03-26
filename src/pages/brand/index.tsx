import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Brand, GetBrandsDocument } from '../../graphql/schema';
import { client } from '../../lib/apollo';

interface Props {
  brands: Brand[];
}

export default function Page({ brands }: Props) {
  return (
    <>
      {brands.map(({ id, name }) => (
        <div key={id}>
          <h3>{name}</h3>
          <Link passHref href={`/brand/${name}`}>
            Check brand
          </Link>
        </div>
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { brands },
  } = await client.query({
    query: GetBrandsDocument,
  });

  return {
    props: {
      brands,
    },
    revalidate: 60 * 10, // 10 mins
  };
};
