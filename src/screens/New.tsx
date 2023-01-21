import { useState } from "react"
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import colors from 'tailwindcss/colors'
import { BackButton } from "../components/BackButton"
import { Check } from "../components/Check"

export function New(){
    const [weekDays, setWeekDays] = useState<number[]>([])
    const availableWeekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado"]

    function handleToggleWeekDays(weekDayIndex: number){
        console.log('eae')
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter((weekDay)=> weekDay !== weekDayIndex))
        }else{
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            >
                <BackButton/>
                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar habito
                </Text>
                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu consentimento?
                </Text>
                <TextInput 
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
                    placeholder="Exercicios, dormir bem e etc..."
                    placeholderTextColor={colors.zinc[400]}
                />
                <Text className="mt-4 mb-3 text-white font-semibold text-base">
                    Qual a recorrencia?
                </Text>
                {
                    availableWeekDays.map((item, index)=>{
                        return <Check 
                                    key={item} 
                                    title={item}
                                    checked={weekDays.includes(index)}
                                    onPress={()=>handleToggleWeekDays(index)}
                                />
                    })
                }
                <TouchableOpacity className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6" activeOpacity={0.7}>
                    <Feather
                        name="check"
                        size={20}
                        color="#fff"
                    />
                    <Text className="text-white font-semibold text-base ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}