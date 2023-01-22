import { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"
import { Header } from "../components/Header";
import { HabitDay, DAY_SIZE  } from "../components/HabitDay";
import { GenerateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { api } from "../lib/axios";
import Loading from "../components/Loading";
import dayjs from "dayjs";

const datesFromYearStart = GenerateDatesFromYearBeginning();
const minimumSummaraySizes = 18 * 7;
const amountOfDaysToFill = minimumSummaraySizes - datesFromYearStart.length

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

type Summary = Array<{
    id: string
    date: string
    amount: number
    completed: number
}> 

export function Home(){
    const [loading, setLoading] = useState(false)
    const [summary, setSummary] = useState<Summary>([])
    const { navigate } = useNavigation()

    async function getSummary(){            
        try{
            setLoading(true)
            const response = await api.get('/summary')
            setSummary(response.data)
        }catch(e){
            console.log(e)
            Alert.alert('ops','erro na requisicao')
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        getSummary()
    },[])

    if(loading){
        return (
            <Loading/>
        )
    }

    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <Header/>
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, i)=>(
                        <Text
                            key={`${weekDay}-${i}`}
                            className={'text-zinc-400 text-xl font-bold text-center mx-1'}
                            style={{width: DAY_SIZE}}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
                <View className="flex-row flex-wrap">
                    { datesFromYearStart.map(date =>{
                        const dayWithHabit = summary.find(day =>{
                            return dayjs(date).isSame(day.date, 'day')
                        })
                        return(
                            <HabitDay
                                key={date.toISOString()}
                                amount={dayWithHabit?.amount}
                                completed={dayWithHabit?.completed}
                                date={date}
                                onPress={()=>navigate("habit", { date: date.toISOString()})}
                            />
                        )}
                        )
                    }
                {
                    amountOfDaysToFill > 0 && Array
                        .from({length: amountOfDaysToFill})
                        .map((_, index) =>(
                            <View 
                            key={index}
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                style={{width: DAY_SIZE, height: DAY_SIZE}}
                            />
                        ))
                }
                </View>
            </ScrollView>
        </View>
    )
}