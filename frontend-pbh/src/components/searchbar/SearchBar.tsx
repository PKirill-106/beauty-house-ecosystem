'use client'
import { CircleX, Search } from 'lucide-react'
import { useRef, useState } from 'react'
import { Input } from '../ui/input'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
	const [searchValue, setSearchValue] = useState<string>('')

	const inputRef = useRef<HTMLInputElement>(null)

	const handleClear = () => {
		setSearchValue('')
		inputRef.current?.focus()
	}

	return (
		<search className={styles.searchBar}>
			<Input
				ref={inputRef}
				value={searchValue}
				onChange={e => {
					e.preventDefault()
					setSearchValue(e.target.value)
				}}
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
