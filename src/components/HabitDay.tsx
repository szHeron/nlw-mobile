
import { TouchableOpacity, TouchableOpacityProps ,Dimensions } from "react-native";
import clsx from "clsx";
import dayjs from "dayjs";
import { generateProgressPorcentage } from "../utils/generate-progress-porcentage";

interface HabitDayProps extends TouchableOpacityProps {
    amount?: number
    completed?: number
    date: Date
}

const WEEK_DAYS = 7;
const SCREE_HORIZONTAL_PADDING = (32 * 2) /5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREE_HORIZONTAL_PADDING + 5);

export function HabitDay({amount = 0, completed = 0, date, ...rest}: HabitDayProps){
    const completedPercentage = amount > 0 ? generateProgressPorcentage(amount, completed) : 0
    const today = dayjs().startOf('day').toDate()
    const isCurrentDay = dayjs(date).isSame(today)

    return(
        <TouchableOpacity 
            {...rest}
            className={
                clsx("w-10 h-10 border-2 rounded-lg m-1", {
                    "bg-zinc-900  border-zinc-800": completedPercentage === 0,
                    "bg-violet-900 border-violet-700": completedPercentage > 0 && completedPercentage < 20,
                    "bg-violet-800 border-violet-600": completedPercentage >= 20 && completedPercentage < 40,
                    "bg-violet-700 border-violet-500": completedPercentage >= 40 && completedPercentage < 60,
                    "bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
                    "bg-violet-500 border-violet-400": completedPercentage >= 80,
                    "border-white border-3": isCurrentDay
                })}
            style={{width: DAY_SIZE, height: DAY_SIZE}}
            activeOpacity={0.7}
        />    
    )
}