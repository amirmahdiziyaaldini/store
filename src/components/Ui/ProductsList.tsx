import ProductCard from './ProductCard';
import { productsTyps } from '../../assets/data/products';
type datatyps = {
	data: productsTyps[];
};


export default function ProductsList({ data }: datatyps) {
	return (
		<>
			{data?.map((item, index) => (
				<ProductCard item={item} key={index} />
			))}
		</>
	);
}

