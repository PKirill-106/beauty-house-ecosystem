import { ISearchInput } from '@/types/interfacesProps'
import { CircleX, Search } from 'lucide-react'
import { Input } from '../ui/input'
import styles from './SearchBar.module.scss'

export default function SearchInput({
	inputRef,
	setIsOpen,
	searchValue,
	setSearchValue,
	handleClear,
}: ISearchInput) {
	return (
		<search className={styles.searchBar}>
			<Input
				ref={inputRef}
				value={searchValue}
				onChange={e => {
					e.preventDefault()
					setSearchValue(e.target.value)
				}}
				onFocus={() => setIsOpen(true)}
				placeholder='Пошук'
				type='search'
				className={styles['search-input']}
			/>
			{searchValue && (
				<CircleX onClick={handleClear} className={styles['clear-icon']} />
			)}
			<Search className={styles['search-icon']} />
		</search>
	)
}
