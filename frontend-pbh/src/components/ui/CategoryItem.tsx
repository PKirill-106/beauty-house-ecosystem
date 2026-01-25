import { ICategoryItem } from "@/types/interfacesProps";

export default function CategoryItem(props: ICategoryItem) {
	return <div>{props.catName}</div>
}
