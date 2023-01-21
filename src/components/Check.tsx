import { TouchableOpacity, View, Text, TouchableOpacityProps } from "react-native"
import Feather from '@expo/vector-icons/Feather';

interface CheckProps extends TouchableOpacityProps{
    title: string
    checked?: boolean
}

export function Check({title, checked = false, ...rest}: CheckProps){
    return(
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row mb-2 items-center"
            {...rest}
        >
            {
                checked?(
                    <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
                        <Feather
                            name="check"
                            size={20}
                            color="#fff"
                        />
                    </View>
                )
                :
                (
                    <View className="h-8 w-8 bg-zinc-700 rounded-lg"/>
                )
            }
            <Text className="text-white text-base ml-3">
                {title}
            </Text>
        </TouchableOpacity>
    )
}