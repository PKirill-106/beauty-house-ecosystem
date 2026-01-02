import { IMyTooltip } from '@/types/interfacesProps'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export default function MyTooltip(props: IMyTooltip) {
	return (
		<Tooltip>
			<TooltipTrigger>{props.element}</TooltipTrigger>
			<TooltipContent>
				<span>{props.tip}</span>
			</TooltipContent>
		</Tooltip>
	)
}
